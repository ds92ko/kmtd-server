import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '@/src/services/todos.js';

export const handleGetTodos = async (req, res) => {
  try {
    const todos = await getTodos(req.query);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading data');
  }
};

export const handleGetTodo = async (req, res) => {
  try {
    const todo = await getTodo(req.params);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
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
    res.status(500).send('Error writing data');
  }
};

export const handleUpdateTodo = async (req, res) => {
  try {
    const todo = await getTodo(req.params);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    const updatedTodo = await updateTodo(req.params, req.body);
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data');
  }
};

export const handleDeleteTodo = async (req, res) => {
  try {
    const todo = await getTodo(req.params);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    await deleteTodo(req.params);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data');
  }
};
