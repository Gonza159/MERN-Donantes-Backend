const { Schema, model } = require('mongoose');

const DonanteSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    // end: {
    //     type: Date,
    //     required: true
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

DonanteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Donante', DonanteSchema );
