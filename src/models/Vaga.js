const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Vaga = new Schema({
    title:{
        type: String,
        required: true
    },
    enterprise:{
        type: String,
        required: true
    },
    requirements:{
        type: String,
        required: true
    },
    salary:{
        type:Number,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

Vaga.index({ title: 'text' });

mongoose.model('vagas', Vaga)

