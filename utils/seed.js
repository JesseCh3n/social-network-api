const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { names, getRandomThoughts, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }


  // Create empty array to hold the users and the thoughts
  const users = [];
  const thoughts = getRandomThoughts(50);

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < names.length; i++) {
    const username = names[i];
    const email = getRandomEmail(i);

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);
  const seedThought = await Thought.collection.insertMany(thoughts);
  if (seedThought.length) {
    for (let i = 0; i < thoughts.length; i++) {
      await User.findOneAndUpdate(
        { username: thoughts[i].username },
        { $addToSet: { thoughts: seedThought.insertedIds[i].toString() } },
        { runValidators: true, new: true }
      );
    }
  }


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.log(thoughts[0].username);
  console.log(seedThought.insertedIds[0].toString());
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
