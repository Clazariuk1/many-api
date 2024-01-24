const express = require('express')

const router = express.Router()
const performersCtrl = require('../controllers/performersController')


// get / performers : list all performers
router.get('/', performersCtrl.index)

// POST /performers : accept performer data and create a new performer
router.post('/', performersCtrl.create)

router.post('/:performerId/movies/:movieId', performerCtrl.addMovie) // MANY TO MANY


module.exports = router
