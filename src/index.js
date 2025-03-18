import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/src/config/swagger.js';
import todoRoutes from '@/src/routes/todos.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the KMTD API😎');
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true, // Swagger UI에서 API 문서 탐색기 활성화
    docExpansion: 'none', // API 문서를 기본적으로 펼치지 않음
    operationsSorter: 'method', // API 메소드별로 정렬
    filter: true, // 검색 기능 활성화
    layout: 'BaseLayout', // 레이아웃 타입 (기본값은 'StandaloneLayout')
    swaggerOptions: {
      url: './config/swagger.json'
    }
  })
);
app.use('/api/todos', todoRoutes);

const PORT = 5683;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
