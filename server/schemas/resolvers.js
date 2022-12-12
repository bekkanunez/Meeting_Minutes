const { Meeting, User } = require('../models');

const resolvers = {
    Query: {
        meeting: async () => {
            return Meeting.find({});
        },
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },

};