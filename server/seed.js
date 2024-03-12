import 'dotenv/config';

import { db } from './libs/dbConnect.js';

const users = [
  {
    username: 'nathan121',
    email: 'nathan@mail.com',
    password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
    avatar:
      'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    username: 'jane78',
    email: 'jane@mail.com',
    password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
    avatar:
      'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const tasks = [
  {
    name: 'Read Atomic Habits',
    description: 'Finish reading Atomic Habits by James Clear',
    priority: 'not urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Learn MERN Stack',
    description:
      'Learn the MERN stack and build a full-stack application with it',
    priority: 'urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

try {
  // Seeding Users
  let collection = db.collection('users');
  console.log('[seed]', 'Seeding Users...');
  const result = await collection.insertMany(users);
  console.log(result.insertedIds);
  console.log('[seed]', 'Seeding Users Done');

  // Seeding Tasks
  tasks[0].owner = result.insertedIds[0];
  tasks[1].owner = result.insertedIds[1];

  collection = db.collection('tasks');
  console.log('[seed]', 'Seeding Tasks...');
  await collection.insertMany(tasks);
  console.log('[seed]', 'Seeding Tasks Done');

  console.log('[seed]', 'All Done');
} catch (error) {
  console.log('[seed]', 'Error: ', error);
}

process.exit();
