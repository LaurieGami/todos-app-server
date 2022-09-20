import { model, Schema, SchemaTypes } from "mongoose";

const todoSchema = new Schema(
    {
        user: SchemaTypes.ObjectId,
        title: String,
        mission: String,
        isDone: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;
