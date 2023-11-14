

const typeDefs = `

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    avatar: String
    friends: [User]
    events: [Event]
  }

  input UserInput {
    username: String
    email: String
    password: String
    avatar: String
  }

  scalar Date   
    type MyType {
        created: Date
    }

  input EventInput {
    eventName: String!
    location: String
    description: String
    startTime: Date!
    endTime: Date!
  }

  input EventUpdateInput {
    eventName: String
    location: String
    description: String
    startTime: Date
    endTime: Date
  }

  type Event {
    _id: ID
    eventName: String!
    location: String
    description: String
    startTime: Date!
    endTime: Date!
    users: [User]
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
    updateUser(userId: ID, userInput: UserInput): User
    deleteUser(userId: ID!): User

    addFriend(friendId: ID, userId: ID): User
    deleteFriend(friendId: ID, userId: ID): User

    addEvent(eventInput: EventInput, userId: ID): Event
    addExistingEvent(eventId: ID, userId: ID): User
    updateEvent(eventId: ID, eventInput: EventUpdateInput): Event
    deleteEvent(eventId: ID, userId: ID): Event
  
  }
`;

module.exports = typeDefs;
