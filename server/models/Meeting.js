const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const meetingSchema = new Schema({
    meetingText: {
        type: String,
        required: true,
        trim: true,
    },
    meetingHost: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    meetingTitle: {
        type: String,
        required: false,
        trim: true,
    },
    meetingDate: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now ,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const Meeting = model ('Meeting', meetingSchema);

module.exports = Meeting;