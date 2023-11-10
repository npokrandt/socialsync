const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
      return users
    },
    user: async (parent, { userId }, context, info) => {
      const user = User.findById(userId)
      return user
    },
    events: async () => {
      const events = await Event.find()
      return events
    },
    event: async (parent, { eventId }, context, info) => {
      const event = await Event.findById(eventId)
      return event
    }

  },

  Mutation: {
   
  },
};

module.exports = resolvers;
