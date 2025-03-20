import { getTodos, createTodo } from '@/src/services/todos.js';

export const handleGetTodos = async (req, res) => {
  try {
    const todos = await getTodos(req.query);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading data');
  }
};

export const handleCreateTodo = async (req, res) => {
  try {
    const todo = await createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading data');
  }
};
