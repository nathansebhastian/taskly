import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../libs/dbConnect.js';

const collection = db.collection('users');

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const query = {
      $or: [{ email }, { username }],
    };
    const existingUser = await collection.findOne(query);
    if (existingUser) {
      return next({
        status: 422,
        message: 'Email or Username is already registered.',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      password: hashedPassword,
      avatar: 'https://g.codewithnathan.com/default-user.png',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { insertedId } = await collection.insertOne(user);
    const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET);
    user._id = insertedId;
    const { password: pass, updatedAt, createdAt, ...rest } = user;
    res
      .cookie('taskly_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next({ status: 500, error });
  }
};
