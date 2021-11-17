const { decodeBase64 } = require('bcryptjs');
const mongoose = require('mongoose');


const bookingSkema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bus',
        required: [true, 'Booking must belong to a bus.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user.']
    },
    bookingDate: {
        type: String,
        default: Date()
    },
    createdAt: {
        type: String,
        default: Date()
    },

})

// bookingSkema.index({ bus: 1, user: 1 }, { unique: true });

bookingSkema.pre(/^find/, function(next) {

    this.populate({
        path: 'bus',
        select: 'name destination'
    })

    next();
})


const Booking = mongoose.model('Booking', bookingSkema);

module.exports = Booking;