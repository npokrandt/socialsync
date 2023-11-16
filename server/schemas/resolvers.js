const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError} = require('graphql')

const resolvers = {
  // add authentication handling to all that need it
  Query: {
    users: async () => {
      const users = await User.find({}).populate('friends').populate('events')
      return users
    },
    nonFriends: async (parent, { userId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      if (userId.length !== 24){
        throw new GraphQLError('Invalid Id')
      }
      const user = await User.findById(userId).populate('friends').populate('events')

      const nins = user.friends

      nins.push(userId)

      const users = await User.find({_id: {$nin: nins}})
      //can I separate out all the users that aren't the user or user's friends?
      if (!user){
        throw new GraphQLError('User not found')
      }

      return users
    },
    user: async (parent, { userId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
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
      const events = await Event.find().populate('users')
      return events
    },
    event: async (parent, { eventId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      if (eventId.length !== 24){
        throw new GraphQLError('Invalid Id')
      }
      const event = await Event.findById(eventId).populate('users')
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

    //update user
    updateUser: async (parent, { userId, userInput }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      const updatedUser = await User.findByIdAndUpdate(userId, userInput)
      if (!updatedUser){
        throw new GraphQLError("user not found")
      }
      return updatedUser
    },

    //remove user
    deleteUser: async (parent, { userId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      const deletedUser = await User.findByIdAndDelete(userId)
      const friends = deletedUser.friends
      const events = deletedUser.events

      if (!deletedUser){
        throw new GraphQLError("user not found")
      }

      //delete user id from all their friends' lists
      for (const friend of friends){
        await User.findByIdAndUpdate(friend._id, {
          $pull: {'friends': deletedUser._id}
        })
      }

      //check length of the users field of all events the user was a part of. Delete any event with no users attached
      for (const event of events){
        //remove the user from the users array of the event
        const eventFound = await Event.findById(event._id)
        const userCount = eventFound.users.length
        //if there is only one user in there, it must be the recently deleted user
        if (userCount === 1){
          await Event.findByIdAndDelete(eventFound._id)
        }
      }
      return deletedUser
    },

    //add friend
    addFriend: async (parent, { friendId, userId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
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
      //add user to their friend's friendlist
      await User.findByIdAndUpdate(friendId, {$addToSet: {'friends': userId}},{new: true})
      return user
    },

    //delete friend
    deleteFriend: async (parent, { friendId, userId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      const user = await User.findByIdAndUpdate(userId, {$pull: {'friends': friendId}},     
      {new: true})
      if (!user){
        throw new GraphQLError("user not found")
      }
      await User.findByIdAndUpdate(friendId, {$pull: {'friends': userId}})
      return user
    },

    //add event
    addEvent: async (parent, { userId, eventInput }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      //a user adds an event. It gets created in the DB, and the user adds it to their events array
      const user = await User.findById(userId)
      if(!user){
        throw new GraphQLError("user not found")
      }
      eventInput = {...eventInput, users: [userId]}
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
      if (!context.user){
        throw AuthenticationError
      }
      //a user adds an event. It gets created in the DB, and the user adds it to their events array
      const test = await User.findById(userId)
      if (!test){
        throw new GraphQLError("user not found")
      }
      const event = await Event.findByIdAndUpdate(eventId,  {
        $addToSet: {'users': userId}
      }, {new: true})
      if (!event){
        throw new GraphQLError("event not found")
      }
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: {'events': eventId}
      }, {new: true}).populate('events')
      return user
    },

    //update event
    updateEvent: async (parent, { eventId, eventInput }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      //a user updates parts of an event. shouldn't require user id
      const newEvent = await Event.findByIdAndUpdate(eventId, eventInput, {new: true})
      if (!newEvent){
        throw new GraphQLError("event not found")
      }
      return newEvent
    },

    //delete event
    deleteEvent: async (parent, { userId, eventId }, context, info) => {
      if (!context.user){
        throw AuthenticationError
      }
      //again, sketchy. A user deletes an event. It is removed from the DB and all users' events array
      const deletedEvent = await Event.findByIdAndDelete(eventId)
      if (!deletedEvent){
        throw new GraphQLError("event not found")
      }
      const users = deletedEvent.users

      //removes the event ID from the event array of any user that was part of the event
      for (const user of users){
        await User.findByIdAndUpdate(user._id, {
          $pull: {'events': deletedEvent._id}
        })
      }
      return deletedEvent
    }

  },
};

module.exports = resolvers;
