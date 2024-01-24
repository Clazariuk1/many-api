// // get / performers : list all performers
// router.get('/', performersCtrl.index)

// // POST /performers : accept performer data and create a new performer
// router.post('/', performersCtrl.create)
// if it starts with movies it goes to the movie router file. if it starts with performers it goes to the performers router.
// it comes down to clarity in documentation / ownership of what route comes first and does what.


const Performer = require('../models/performer')
const Movie = require('../models/movie')



exports.index = async (req, res) => {
    try {
        const performers = await Performer.find({})
        res.status(200).json(performers)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        const createdPerformer = await Performer.create(req.body)
        res.status(200).json(createdPerformer)
    } catch (error) {
        restart.status(400).json({ msg: error.message })
    }
}

exports.addMovie = async function addMovie(req, res) {
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
