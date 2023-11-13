const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError} = require('graphql')

const resolvers = {
  // ALL DELETE FUNCTIONS: add other deletion stuff
  // add authentication handling to all that need it
  // figure out why login and create user return user as null
  Query: {
    users: async () => {
      const users = await User.find({}).populate('friends').populate('events')
      return users
    },
    user: async (parent, { userId }, context, info) => {
      if (userId.length !== 24){
        throw new GraphQLError('Invalid Id')
      }
      const user = await User.findById(userId).populate('friends').populate('events')
      if (!user){
        throw new GraphQLError('User not found')
      }
      return user
    }, 
    events: async () => {
      const events = await Event.find()
      return events
    },
    event: async (parent, { eventId }, context, info) => {
      if (eventId.length !== 24){
        throw new GraphQLError('Invalid Id')
      }
      const event = await Event.findById(eventId)
      if (!event){
        throw new GraphQLError('Event not found')
      }
      return event
    }

  },

  Mutation: {
    //add user
    addUser: async (parent, { username, email, password }, context, info) => {
      const addUser = await User.create({username, email, password})
      if (!addUser){
        throw new GraphQLError("user creation unsuccessful")
      }
      console.log(addUser)
      const token = signToken(addUser)
      return {addUser, token}
    },

    //login
    login: async (parent, { email, password }, context, info) => {
      const login = await User.findOne({email}) 
      if (!login){
        throw new GraphQLError("login unsuccessful")
      }
      const verifyPw = await login.isCorrectPassword(password)
      if (verifyPw) {
        const token = signToken(login)
        return {token, login}
      } else {
        //AuthenticationError()
        throw new GraphQLError("login unsuccessful")
      }
    },

    //remove user
    deleteUser: async (parent, { userId }, context, info) => {
      // TODO: remove user from all friend lists and an event IF they are the only user attached to it
      const deletedUser = await User.findByIdAndDelete(userId)
      if (!deletedUser){
        throw new GraphQLError("user not found")
      }
      return deletedUser
    },

    //add friend
    addFriend: async (parent, { friendId, userId }, context, info) => {
      if (userId === friendId){
        throw new GraphQLError("User cannot be their own friend")
      }
      //checking that the other user exists
      const friend = await User.findById(friendId)
      if(!friend){
        throw new GraphQLError("invalid friend ID")
      }
      const user = await User.findByIdAndUpdate(userId, {$addToSet: {'friends': friendId}},{new: true})
      if (!user){
        throw new GraphQLError("user not found")
      }
      return user
    },

    //delete friend
    deleteFriend: async (parent, { friendId, userId }, context, info) => {
      const user = await User.findByIdAndUpdate(userId, {$pull: {'friends': friendId}},     
      {new: true})
      if (!user){
        throw new GraphQLError("user not found")
      }
      return user
    },

    //add event
    addEvent: async (parent, { userId, eventInput }, context, info) => {
      //a user adds an event. It gets created in the DB, and the user adds it to their events array
      const test = await User.findById(userId)
      if(!test){
        throw new GraphQLError("user not found")
      }
      //eventInput = {...eventInput}
      const newEvent = await Event.create(eventInput)
      if (!newEvent){
        throw new GraphQLError("event not found")
      }
      const eventId = newEvent._id

      await User.findByIdAndUpdate(userId, {
        $addToSet: {'events': eventId}
      }, {new: true})

      return newEvent
    },

    //for when a user finds an existing event and adds it to their event array
    addExistingEvent: async (parent, { userId, eventId }, context, info) => {
      //a user adds an event. It gets created in the DB, and the user adds it to their events array
      const event = await Event.findById(eventId)
      if (!event){
        throw new GraphQLError("event not found")
      }
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: {'events': eventId}
      }, {new: true}).populate('events')
      if (!user){
        throw new GraphQLError("user not found")
      }
      return user
    },

    //update event
    updateEvent: async (parent, { eventId, eventInput }, context, info) => {
      //a user updates parts of an event. shouldn't require user id
      const newEvent = await Event.findByIdAndUpdate(eventId, eventInput, {new: true})
      if (!newEvent){
        throw new GraphQLError("event not found")
      }
      return newEvent
    },

    //delete event
    deleteEvent: async (parent, { userId, eventId }, context, info) => {
      //again, sketchy. A user deletes an event. It is removed from the DB and all users' events array
      const deletedEvent = await Event.findByIdAndDelete(eventId)
      if (!deletedEvent){
        throw new GraphQLError("event not found")
      }

      //await User.findByIdAndUpdate(userId, {
        //$pull: {'events': deletedEvent._id}
      //})
      return deletedEvent
    }

  },
};

module.exports = resolvers;
