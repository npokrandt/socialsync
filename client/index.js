import { gql, useQuery } from '@apollo/client';

const  GET_USERS = gql`
query getUsers {
  users {
    _id
    username
    email
    events {
      eventName
      startTime
      endTime
    }
  }
}
`;
