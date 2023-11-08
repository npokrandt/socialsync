const {Schema, model} = require('mongoose')

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: String,
    description: String,
    startTime: Date,
    endTime: Date
})

const Event = model('Event', eventSchema)

module.exports = Event