import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/src/config/swagger.js';
import todoRoutes from '@/src/routes/todos.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send('Welcome to the KMTD API😎');
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: '고민 TODO API 문서',
    swaggerOptions: {
      layout: 'BaseLayout',
      deepLinking: true,
      defaultModelRendering: 'model',
      docExpansion: 'list',
      filter: true,
      operationsSorter: (a, b) => {
        const order = ['get', 'post', 'put', 'patch', 'delete'];

        const aMethod = order.indexOf(Object.fromEntries(a._root.entries).method.toLowerCase());
        const bMethod = order.indexOf(Object.fromEntries(b._root.entries).method.toLowerCase());

        return aMethod - bMethod;
      },
      showExtensions: true,
      showCommonExtensions: true
    }
  })
);
app.use('/api/todos', todoRoutes);

const PORT = 5683;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
