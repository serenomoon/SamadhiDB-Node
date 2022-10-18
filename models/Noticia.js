
const { Schema, model } = require("mongoose");

const NoticiaSchema = Schema({

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
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

NoticiaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Noticia', NoticiaSchema );