const { Schema, model } = require('mongoose');

const fmeetingSchema = new Schema({
    fmeetingTitle: {
        type: String,
        required: true,
        trim: true,
    },
    fmeetingHost: {
        type: String,
        required: true,
        trim: true,
    },
    fdepartment: {
        type: String,
        required: true,
        trim: true,
    },
    fmeetingDate: {
        type: String,
        required: true,
    },
    fmeetingTime: {
        type: String,
        required: true,
        trim: true,
    }
})

const futureMeeting = model ('futureMeeting', fmeetingSchema);

module.exports = futureMeeting;