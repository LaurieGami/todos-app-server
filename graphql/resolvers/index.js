import getTodoList from "./Query/getTodoList";

import registerUser from "./Mutation/registerUser";
import loginUser from "./Mutation/loginUser";
import addTodo from "./Mutation/addTodo";

const resolvers = {
    Query: {
        getTodoList
    },
    Mutation: {
        registerUser,
        loginUser,
        addTodo
    }
}

export default resolvers;
