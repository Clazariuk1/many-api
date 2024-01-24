const Movie = require('../models/movie')
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

// exports.addPerformer = async function addPerformer(req, res) {
//     try {
//         const createdMovie = await Movie.create(req.body)
//         res.status(200).json(createdMovie)
//     } catch (error) {
//         res.status(400).json({msg: error.message })
//     }
// }

// show route needs to be last in sequence so it doesn't tarnish anything.
