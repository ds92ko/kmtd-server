import fs from 'fs/promises';
import path from 'path';

const TODOS_FILE_PATH = path.join(__dirname, '../data/todos.json');

export const readTodos = async () => {
  const data = await fs.readFile(TODOS_FILE_PATH, 'utf8');
  return JSON.parse(data);
};
