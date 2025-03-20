import { readTodos, writeTodos } from '@/src/models/todos.js';

export const getTodos = async query => {
  const { status, sort, type, keyword } = query;
  const todos = await readTodos();

  return todos
    .filter(todo => {
      const matchesStatus = status ? todo.is_completed === (status === 'complete') : true;
      const matchesType = type && keyword ? todo[type].includes(keyword) : true;

      return matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const createdAtA = new Date(a.created_at).getTime();
      const createdAtB = new Date(b.created_at).getTime();

      return sort === 'asc' ? createdAtA - createdAtB : createdAtB - createdAtA;
    });
};

export const createTodo = async body => {
  const todos = await readTodos();
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    ...body,
    is_completed: false,
    completed_at: null,
    created_at: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString()
  };

  todos.push(newTodo);

  await writeTodos(todos);

  return newTodo;
};
