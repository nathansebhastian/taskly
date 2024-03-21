import { db } from '../libs/dbConnect.js';
import { ObjectId } from 'mongodb';

const collection = db.collection('tasks');

export const getTasksByUser = async (req, res, next) => {
  try {
    const query = { owner: new ObjectId(req.params.id) };
    const { status, orderBy } = req.query;
    const sort = orderBy ? { [orderBy]: 1 } : {};
    if (status) {
      query['status'] = status;
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;

    const tasks = await collection
      .find(query)
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .toArray();

    const taskCount = await collection.count(query);
    res.status(200).json({ tasks, taskCount });
  } catch (error) {
    next({ status: 500, error });
  }
};

export const getTask = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const task = await collection.findOne(query);

    if (!task) {
      return next({ status: 404, message: 'Task not found!' });
    }

    res.status(200).json(task);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    newTask.owner = new ObjectId(req.user.id);
    newTask.createdAt = new Date().toISOString();
    newTask.updatedAt = new Date().toISOString();
    const task = await collection.insertOne(newTask);
    return res.status(200).json(task);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    await collection.deleteOne(query);
    res.status(200).json({ message: 'Task has been deleted' });
  } catch (error) {
    next({ status: 500, error });
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const data = {
      $set: {
        ...req.body,
        owner: new ObjectId(req.body.owner),
        updatedAt: new Date().toISOString(),
      },
    };
    const options = {
      returnDocument: 'after',
    };
    const updatedTask = await collection.findOneAndUpdate(query, data, options);
    res.status(200).json(updatedTask);
  } catch (error) {
    next({ status: 500, error });
  }
};
