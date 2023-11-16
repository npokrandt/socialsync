import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      username
      email
      _id
      avatar
      friends {
        _id
        username
      }
      events {
        _id
        eventName
      }
    }
  }
`;

export const QUERY_NON_FRIENDS = gql`
  query NonFriends {
    nonFriends {
      username
      email
      _id
      avatar
      friends {
        _id
        username
      }
      events {
        _id
        eventName
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      username
      email
      _id
      avatar
      friends {
        _id
        username
      }
      events {
        _id
        eventName
        startTime
        endTime
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
query Events {
  events {
    _id
    description
    endTime
    eventName
    location
    startTime
    users {
      username
      _id
    }
  }
}
`

export const QUERY_EVENT = gql`
query Event($eventId: ID!) {
  event(eventId: $eventId) {
    _id
    description
    endTime
    eventName
    location
    startTime
    users {
      _id
      username
    }
  }
}`
