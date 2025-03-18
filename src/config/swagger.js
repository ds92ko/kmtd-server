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
      url: 'http://localhost:3000'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/todos.js')]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
