const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    friends: [User]
    events: [Event]
  }

  input EventInput {
    eventName: String!
    location: String
    description: String
    startTime: Date!
    endTime: Date!
  }

  type Event {
    _id: ID
    eventName: String!
    location: String
    description: String
    startTime: Date!
    endTime: Date!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    events: [Event]!
    event(eventId: ID!): Event
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User

    addFriend(friendId: ID, userId: ID): User
    deleteFriend(friendId: ID, userId: ID): User

    updateEvent(eventID: ID, eventInput: EventInput): Event
    deleteEvent(eventID: ID): Event


    addEvent(eventInput: EventInput): Event
   
  }
`;

module.exports = typeDefs;
