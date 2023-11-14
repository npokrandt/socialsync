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
  query userFriends($userId: ID!) {
    user(userId: $userId) {
      friends {
        username
      }
    }
  }
`;
