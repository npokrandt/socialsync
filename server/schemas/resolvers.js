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
      const user = await User.findByIdAndUpdate(userId, {$addToSet: {'friends': friendId},
      new: true})
      return user
    },

    //delete friend
    deleteFriend: async (parent, { friendId, userId }, context, info) => {
      const user = await User.findByIdAndUpdate(userId, {$pull: {'friends': friendId}},
      {new: true})
      return user
    },

    //add event
    addEvent: async (parent, { userId, eventInput }, context, info) => {
      //a user adds an event. It gets created in the DB, and the user adds it to their events array
      const newEvent = await Event.create(eventInput)
      const eventId = newEvent._id

      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: {'events': eventId}
      }, {new: true}, {raw: true})
      console.log(user)
      return newEvent
    },

    //for when a user finds an existing event and adds it to their event array
    addExistingEvent: async (parent, { userId, eventId }, context, info) => {
      //a user adds an event. It gets created in the DB, and the user adds it to their events array

      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: {'events': eventId}
      }, {new: true}).populate('events')
      return user
    },

    //update event
    updateEvent: async (parent, { eventId, eventInput }, context, info) => {
      //a user updates parts of an event. shouldn't require user id
      const newEvent = await Event.findByIdAndUpdate(eventId, eventInput, {new: true})
      return newEvent
    },

    //delete event
    deleteEvent: async (parent, { userId, eventId }, context, info) => {
      //again, sketchy. A user deletes an event. It is removed from the DB and all users' events array
      const deletedEvent = await Event.findByIdAndDelete(eventId)

      await User.findByIdAndUpdate(userId, {
        $pull: {'events': deletedEvent._id}
      })
      return deletedEvent
    }

  },
};

module.exports = resolvers;
