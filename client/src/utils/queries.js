import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_USER_FRIENDS = gql`
  query userFriends($userID: ID!) {
    user(userId: $userID) {
      friends {
        username
      }
    }
  }
`;
