import { readTodos } from '@/src/models/todos.js';

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
