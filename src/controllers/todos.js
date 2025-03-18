import { getTodos } from '@/src/services/todos.js';

export const handleGetTodos = async (req, res) => {
  try {
    const todos = await getTodos(req.query);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading data');
  }
};
