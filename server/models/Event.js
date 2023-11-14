const {Schema, model} = require('mongoose')

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    users: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
}) 

const Event = model('Event', eventSchema)

module.exports = Event