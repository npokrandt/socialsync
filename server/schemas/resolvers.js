const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).populate('friends').populate('events')
      return users
    },
    user: async (parent, { userId }, context, info) => {
      const user = User.findById(userId).populate('friends').populate('events')
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
      console.log(login)
      const token = signToken(login)
      if (verifyPw) {
        return {token, login}
      } else {
        console.log("Something went wrong")
      }
    },

    //remove user
    deleteUser: async (parent, { userId }, context, info) => {
      // TODO: remove user from all friend lists and an event IF they are the only user attached to it
      const deletedUser = await User.findByIdAndDelete(userId)
      return deletedUser
    },

    //add friend
    addFriend: async (parent, { friendId, userId }, context, info) => {
      const user = User.findByIdAndUpdate(userId, {$addToSet: {'friends': friendId},
      new: true})
      return user
    },

    //delete friend
    deleteFriend: async (parent, { friendId, userId }, context, info) => {
      const user = User.findByIdAndUpdate(userId, {$pull: {'friends': friendId}},
      {new: true})
      return user
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
