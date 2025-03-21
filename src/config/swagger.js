import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

import {
  TodoStatus,
  TodoSort,
  TodoSearchType,
  TodoId,
  Todo,
  Todos,
  AddableTodo,
  EditableTodo,
  TodoCount
} from '@/src/schemas/todos';

const definition = {
  openapi: '3.1.0',
  info: {
    title: '📝 고민 TODO API 문서',
    version: '1.0.0',
    description: '고민 TODO Express API'
  },
  tags: [{ name: 'Todos', description: '📋 TODO 관련 API' }],
  externalDocs: {
    description: '📖 고민 TODO Notion',
    url: 'https://www.notion.so/dasomko/TODO-1ad6b87bfb1080dbb6e2c42774494647?pvs=4'
  },
  servers: [
    {
      url: 'https://kmtd-server.vercel.app',
      description: '🚀 운영 서버'
    },
    {
      url: 'http://localhost:5683',
      description: '🛠️ 개발 서버'
    }
  ],
  components: {
    schemas: {
      TodoStatus,
      TodoSort,
      TodoSearchType,
      TodoId,
      Todo,
      Todos,
      AddableTodo,
      EditableTodo,
      TodoCount
    }
  }
};

const options = {
  definition,
  apis: [path.join(__dirname, '../routes/todos.js')],
  failOnErrors: true,
  verbose: true
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
