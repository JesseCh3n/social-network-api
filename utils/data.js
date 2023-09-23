const names = [
  'Aaron Jones',
  'Leo Aaron-James',
  'Aayan Mohammed',
  'Abbas Abdallah',
  'Abdallah Abdalroof',
  'Abdul Basir',
  'Abdul Karem',
  'Mye Coollastname',
  'John Ze',
  'Zi Yi',
  'Zinedine Zidane',
  'Zijie Hu',
  'Zion Williams',
  'Michael Jordan',
  'Anthony Xander',
  'Courtney Fuller',
  'Gillian Flynn',
  'Jared Casey',
  'Grace Temple',
  'Kelsey Liu',
  'Tamara Smith',
  'Alex Sander',
  'Mark Webber',
  'Graham Farish',
  'Sarah Bane',
  'Nathaniel Jackson',
  'Tony Parker',
];

const emails = [
  'hotmail.com',
  'gmail.com',
  'apple.com',
  'amazon.com',
  'facebook.com',
  'tesla.com',
  'secretemail.co',
  'idunno.com',
  'whatever.com'
];

const appDescriptions = [
  'Its a cracker',
  'I am thinking',
  'Learning Piano',
  'I am a digital nomad',
  'This is an awesome game',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Facebook friends',
  'Running app',
  'Cooking app',
  'Netflix addict',
  'I am a foodie',
  'Mama Mia!',
  'Holy crab!'
];

const appReactions = [
  'Ok',
  'Great',
  'Wonderful',
  'Bad',
  'Poor',
  'Wow',
  'Yay',
  'Its alright',
  'Not too bad',
  'Ecstatic'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

const getRandomEmail = (int) => 
  `${names[int].split(" ")[0]}@${getRandomArrItem(emails)}`;

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(appDescriptions),
      username: getRandomName(),
      reactions: [...getRandomReactions(5)],
    });
  }
  return results;
};

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(appReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { names, getRandomThoughts, getRandomEmail };
