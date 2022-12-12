import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_MEETINGS = gql`
  query getMeetings {
    meetings {
      _id
      meetingText
      meetingAuthor
      createdAt
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      meetings {
        _id
        meetingText
        meetingAuthor
        createdAt
      }
    }
  }
`;
