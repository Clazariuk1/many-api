// MUST include BOTH many to many models in your intedned controller file to correctly construct a route many-many

const Movie = require('../models/movie')
const Performer = require('../models/performer')
// // POST /movies:
// router.post('/', movieCtrl.create)
// // GET /movies:
// router.get('/', movieCtrl.index)
// // GET /movies/:id
// router.get('/:id', movieCtrl.show)
// // POST /movies/moviewperformer
// router.get('/:movieId/performers/:performerId', movieCtrl.addPerformer) // MANY TO MANY


exports.create = async function(req, res) {
    try {
        const createdMovie = await Movie.create(req.body)
        res.status(200).json(createdMovie)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

exports.index = async function(req, res) {
    try {
        const foundMovie = await Movie.find({})
        res.status(200).json(foundMovie)
    } catch (error) {
        res.status(400).json({msg: error.message })
    }
}

exports.show = async function(req, res) {
    try {
        const foundMovie = await Movie.findOne({_id: req.params.id })
        res.status(200).json(foundMovie)
    } catch (error) {
        res.status(400).json({msg: error.message })
    }
}

// below. MANY TO MANY operation.

exports.addPerformer = async function addPerformer(req, res) {
    try {
        const foundPerformer = await Performer.findOne({ _id: req.params.performerId }) // we name performerId in the movies router!!!
        if (!foundPerformer) throw new Error(`Could not locate performer with id ${req.params.performerId}`)
        const foundMovie = await Movie.findOne({ _id: req.params.movieId }) // same as above. you must include BOTH many options in this scenario.
        if (!foundMovie) throw new Error(`Could not locate performer with id ${req.params.movieId}`)
        // MANY TO MANY. put the movie on the performer and the performer on the movie.
        foundMovie.cast.push(foundPerformer._id)
        foundPerformer.credits.push(foundMovie._id)
        await foundMovie.save()
        await foundPerformer.save()
        res.status(200).json({
            msg: `Successfully associated performer with id ${req.params.performerId} with movie with id ${req.params.movieId}`,
            movie: foundMovie,
            performer: foundPerformer
        })
    } catch (error) {
        res.status(400).json({msg: error.message })
    }
}

// show route needs to be last in sequence so it doesn't tarnish anything.


const createPerformerAndAddToMovie = async () => {
    try {
        const response = await fetch('/performers', {
            method: 'POST',
            body: JSON.stringify({
                name,
                birthdate,
                credits: [movie.id]
            })
        })
        const createdPerformer = await response.json()
        const responsetwo = await fetch(`/movies/${movie._id}/performers/${createdPerformer._id}`, {
            method: 'POST'
        })
        const completedData = await response.json()
        // something else front end wants to do with this data.
    } catch (error) {
        res.status(400).json({msg: error.message })
    }
}


// THE BEST FUNCTIONS AND ROUTES ARE ONES THAT DO LESS THINGS. If you make a route that does two things it's not as good. just make an additional route.
// it is the FRONT end's job to know the intentionality of the user and the upcoming data. It's the BACK end's job to create the framework in which it can spawn.
