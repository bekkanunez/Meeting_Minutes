const db = require('../config/connection');
const { User, Meeting } = require('../models');
const userSeeds = require('./userSeeds.json');
const meetingSeeds = require('./meetingSeeds.json');

db.once('open', async () => {
  try {
    await Meeting.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < meetingSeeds.length; i++) {
      const { _id, meetingHost } = await Meeting.create(meetingSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: meetingHost },
        {
          $addToSet: {
            meetings: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
