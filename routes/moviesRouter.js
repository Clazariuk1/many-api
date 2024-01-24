//do the controller last because the routes inform what type of controllers are needed to be made.

const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/moviesController')

// POST /movies:
router.post('/', movieCtrl.create)
// GET /movies:
router.get('/', movieCtrl.index)
// GET /movies/:id
router.get('/:id', movieCtrl.show)
// POST /movies/moviewperformer
router.post('/:movieId/performers/:performerId', movieCtrl.addPerformer) // MANY TO MANY


module.exports = router

// PATCH request : to change a specific PART of a data set, rather than the entire object. Adding comments/likes is a patch.
