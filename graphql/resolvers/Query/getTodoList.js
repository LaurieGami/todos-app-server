import { Types } from "mongoose";
import { ApolloError } from 'apollo-server-express';
import User from '../../../db/models/User';
import Todo from '../../../db/models/Todo';

async function getTodoList(root, args, context) {
    const { user } = args

    const isUserValid = await User.findOne({ _id: Types.ObjectId(user) })

    if (!isUserValid) throw new ApolloError("User for which you're trying to retrieve the todo list does not exist", 'INVALID_USER')

    return await Todo.find({ user });
};

export default getTodoList;
