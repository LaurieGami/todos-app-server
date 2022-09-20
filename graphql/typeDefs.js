import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        id: ID
        email: String
        password: String
        token: String
    }
    type Todo {
        id: ID
        user: ID
        title: String
        mission: String
        isDone: Boolean
        createdAt: String
        updatedAt: String
    }
    input UserInput {
        email: String
        password: String
    }
    input TodoInput {
        user: ID
        title: String
        mission: String
        isDone: Boolean
    }
    type Query {
        getTodoList(user: ID): [Todo]
    }
    type Mutation {
        registerUser(registerInput: UserInput): User
        loginUser(loginInput: UserInput): User
        addTodo(todoInput: TodoInput): Todo
    }
`;

export default typeDefs;
