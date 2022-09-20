import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApolloError } from "apollo-server-express";

import User from "../../../db/models/User";

dotenv.config();

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET

async function registerUser(root, args, context) {
    const { registerInput: { email, password } } = args

    const oldUser = await User.findOne({ email })

    if (oldUser) {
        throw new ApolloError(`A user is already registered with this email: ${email}`, 'USER_ALREADY_EXISTS')
    }

    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = new User({
        email: email.toLowerCase(),
        password: encryptedPassword
    })

    const token = jwt.sign(
        {
            id: newUser._id,
            email
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    )

    newUser.token = token

    const res = await newUser.save()

    return {
        id: res.id,
        ...res._doc
    }
}

export default registerUser;
