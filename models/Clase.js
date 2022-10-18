
const { Schema, model } = require("mongoose");

const ClaseSchema = Schema({

    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    uploadimg: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    date: {
        type: Date,
        required: true
    },

});

ClaseSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Clase', ClaseSchema );