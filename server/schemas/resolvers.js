const { LogTimings } = require('concurrently');
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
    //add user
    addUser: async (parent, { username, email, password }, context, info) => {
      const addUser = await User.create({username, email, password})
      console.log(addUser)
      const token = signToken(addUser)
      return {addUser, token}
    },

    //login
    login: async (parent, { email, password }, context, info) => {
      const login = await User.findOne({email}) 
      const verifyPw = await login.isCorrectPassword(password)
      const token = signToken(login)
      if (verifyPw) {
        return {login, token}
      } else {
        console.log("Something went wrong")
      }
    },

    //remove user
    removeUser: async (parent, { userId }, context, info) => {
      return null
    },

    //add friend
    addFriend: async (parent, { friendId, userId }, context, info) => {
      return null
    },

    //delete friend
    deleteFriend: async (parent, { friendId, userId }, context, info) => {
      return null
    },

    //update event
    updateEvent: async (parent, { eventId, eventInput }, context, info) => {
      return null
    },

    //delete event
    deleteEvent: async (parent, { eventId }, context, info) => {
      return null
    },

    //add event
    addEvent: async (parent, { eventInput }, context, info) => {
      return null
    }
  },
};

module.exports = resolvers;
