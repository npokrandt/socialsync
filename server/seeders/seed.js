const db = require('../config/connection');
const { User, Event } = require('../models');
const userSeeds = require('./userSeeds')
const eventSeeds = require('./eventSeeds')
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Event', 'events');
    
    const events = await Event.create(eventSeeds);

    //for each event, assign it to some random user
    const users = await User.create(userSeeds)
    
    for (const user of users){
      const eventNumber = Math.floor(Math.random()*3)
      for (let i = 0; i < eventNumber; i++){
        const eventIndex = Math.floor(Math.random()*events.length)
        const event = events[eventIndex]
        await User.findByIdAndUpdate(user._id, {
          $addToSet: {events: event._id}
        })
      }
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
