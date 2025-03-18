import dotenv from 'dotenv';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '고민 TODO API',
    version: '1.0.0',
    description: '고민 TODO Express API'
  },
  servers: [
    {
      url: process.env.APP_URL || 'https://kmtd-server.vercel.app'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [path.resolve('src/routes/todos.js')]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
