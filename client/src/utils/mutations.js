import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID, $userInput: UserInput) {
    updateUser(userId: $userId, userInput: $userInput) {
      username
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($friendId: ID, $userId: ID) {
    addFriend(friendId: $friendId, userId: $userId) {
      _id
      username
      friends {
        _id
      }
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation DeleteFriend($friendId: ID, $userId: ID) {
    deleteFriend(friendId: $friendId, userId: $userId) {
      _id
      username
      friends {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($eventInput: EventInput, $userId: ID) {
    addEvent(eventInput: $eventInput, userId: $userId) {
      _id
      eventName
    }
  }
`

export const ADD_EXISTING_EVENT = gql`
  mutation AddExistingEvent($eventId: ID, $userId: ID) {
    addExistingEvent(eventId: $eventId, userId: $userId) {
      _id
      events {
        eventName
      }
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventId: ID, $eventInput: EventUpdateInput) {
    updateEvent(eventId: $eventId, eventInput: $eventInput) {
      eventName
    }
  }
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID) {
    deleteEvent(eventId: $eventId) {
      eventName
    }
  }
`
