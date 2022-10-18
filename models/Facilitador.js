//     date = models.DateField()
//     time = models.TimeField()
//     uploadimgname 

const { Schema, model } = require("mongoose");

const FacilitadorSchema = Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    cellphone: {
        type: Number
    },
    bio: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    claseadd: {
        type: String,
        required: true
    },
    activity: {
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

FacilitadorSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Facilitador', FacilitadorSchema );