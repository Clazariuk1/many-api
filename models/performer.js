const mongoose = require('mongoose')

const performerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: String, required: true },
    credits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] // THIS MAKES IT MANY TO MANY.
})

const Performer = mongoose.model('Performer', performerSchema)

module.exports = Performer
