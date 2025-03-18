import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '고민 TODO API',
    version: '1.0.0',
    description: '고민 TODO Express API'
  },
  servers: [
    {
      url: 'https://kmtd-server.vercel.app',
      description: '운영 서버',
    },
    {
      url: 'http://localhost:5683',
      description: '개발 서버'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/todos.js')]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
