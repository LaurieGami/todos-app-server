import Todo from '../../../db/models/Todo';

async function addTodo(root, args, context) {
    const { todoInput } = args

    const newTodo = new Todo({
        ...todoInput
    })

    const res = await newTodo.save()

    return {
        id: res.id,
        ...res._doc
    };
};

export default addTodo;
