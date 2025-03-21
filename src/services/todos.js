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

export const getTodo = async params => {
  const { id } = params;
  const todos = await readTodos();

  return todos.find(todo => todo.id === Number(id));
};

export const createTodo = async body => {
  const todos = await readTodos();
  const id = todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;
  const newTodo = {
    id,
    ...body,
    is_completed: false,
    completed_at: null,
    created_at: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString()
  };

  todos.push(newTodo);

  await writeTodos(todos);

  return newTodo;
};

export const updateTodo = async (params, body) => {
  const { id } = params;
  const { title, content, is_completed } = body;
  const todos = await readTodos();
  let updatedTodo;

  const newTodos = todos.map(todo => {
    if (todo.id === Number(id)) {
      updatedTodo = {
        ...todo,
        title,
        content,
        is_completed,
        completed_at:
          todo.is_completed === is_completed
            ? todo.completed_at
            : is_completed
              ? new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString()
              : null
      };
      return updatedTodo;
    }
    return todo;
  });

  await writeTodos(newTodos);

  return updatedTodo;
};

export const deleteTodo = async params => {
  const { id } = params;
  const todos = await readTodos();
  const newTodos = todos.filter(todo => todo.id !== Number(id));

  await writeTodos(newTodos);
};
