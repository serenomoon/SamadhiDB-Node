
const { Schema, model } = require("mongoose");

const AlumnoSchema = Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    cellphone: {
        type: Number
    },
    claseadd: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

AlumnoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Alumno', AlumnoSchema );