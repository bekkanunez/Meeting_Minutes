import { gql } from '@apollo/client';

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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEETING = gql`
  mutation addMeeting($meetingText: String!, $meetingHost: String!, $department: String!, $meetingTitle: String!, $meetingDate: String!) {
    addMeeting(meetingText: $meetingText, meetingHost: $meetingHost, department: $department, meetingTitle: $meetingTitle, meetingDate: $meetingDate) {
      _id
      meetingText
      meetingHost
      department
      meetingTitle
      meetingDate
      createdAt
    }
  }
`;