const mongoose = require('mongoose')

const nombreSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    }
})

const Participantes = mongoose.model('Participante', nombreSchema)
module.exports = Participantes