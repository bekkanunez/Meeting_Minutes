import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      meetings {
        _id
        meetingText
        meetingDate
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
      meetingHost
      department
      meetingTitle
      meetingDate
    }
  }
`;

export const QUERY_SINGLE_MEETING = gql`
  query getSingleMeeting($meetingId: ID!) {
    meeting(meetingId: $meetingId) {
      _id
      meetingText
      meetingHost
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
        meetingDate
        createdAt
      }
    }
  }
`;
