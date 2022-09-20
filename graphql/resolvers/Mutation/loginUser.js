import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApolloError } from "apollo-server-express";

import User from "../../../db/models/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

async function loginUser(root, args, context) {
    const { loginInput: { email, password } } = args

    const user = await User.findOne({ email })

    if (!user) throw new ApolloError(`User with email "${email}" does not exist`, 'INVALID_USER')

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (user && isPasswordValid) {
        const token = jwt.sign(
            {
                id: user._id,
                email
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        user.token = token

        return {
            id: user._id,
            ...user._doc
        }
    } else {
        throw new ApolloError('Invalid password', 'INVALID_PASSWORD')
    }
}

export default loginUser;
