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


  // Create empty array to hold the users and create 50 random thoughts
  const users = [];
  const thoughts = getRandomThoughts(50);

  // Loop through the 'names' to generate User doc
  for (let i = 0; i < names.length; i++) {
    const username = names[i];
    const email = getRandomEmail(i);

    users.push({
      username,
      email,
    });
  }

  // Looping async functions to link Thought id with User;
  
  await User.create(users).then(() => {
    return Thought.create(thoughts).then(resolve => {
      let prom = [];
      for (let i=0; i < resolve.length; i++) {
        console.log(resolve[i].username);
        console.log(resolve[i]._id);
        const e = User.findOneAndUpdate(
          { username: resolve[i].username },
          { $addToSet: { thoughts: resolve[i]._id } },
          { runValidators: true, new: true }
        );
        prom.push(e);
      }
      return Promise.all(prom);
    });
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
