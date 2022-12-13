const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    meetings: [Meeting]!
  }

  type Meeting {
    _id: ID
    meetingText: String
    meetingHost: String
    department: String
    meetingTitle: String
    meetingDate: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    meetings(username: String): [Meeting]
    meeting(meetingId: ID!): Meeting
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMeeting(meetingText: String!): Meeting
    updateMeetingText(thoughtId: ID!, commentText: String!): Meeting
    removeMeeting(meetingId: ID!): Meeting
  }
`;

module.exports = typeDefs;