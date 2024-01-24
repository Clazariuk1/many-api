const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    mpaaRating: { type: String, required: true },
    cast: [{type: mongoose.Schema.Types.ObjectId, ref: 'Performer'}] // this is what makes it a many to many model. start the array as EMPTY , not required, so that it can exist without things added
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
