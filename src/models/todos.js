import fs from 'fs/promises';
import path from 'path';

const TODOS_FILE_PATH = path.join('/tmp', 'todos.json');

const initializeTodosFile = async () => {
  try {
    await fs.access(TODOS_FILE_PATH);
  } catch (err) {
    await fs.mkdir(path.dirname(TODOS_FILE_PATH), { recursive: true });
    await fs.writeFile(TODOS_FILE_PATH, JSON.stringify([]));
  }
};

export const readTodos = async () => {
  await initializeTodosFile();
  const data = await fs.readFile(TODOS_FILE_PATH, 'utf8');
  return JSON.parse(data);
};

export const writeTodos = async todos => {
  await initializeTodosFile();
  const data = JSON.stringify(todos, null, 2);
  await fs.writeFile(TODOS_FILE_PATH, data);
};
