import express from 'express';
import { validateRequest } from '@/src/middlewares/todos.js';
import {
  handleGetTodos,
  handleGetTodo,
  handleCreateTodo,
  handleDeleteTodo
} from '@/src/controllers/todos.js';

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: TODO 목록 조회
 *     description: 완료 상태 필터와 제목/내용 검색 및 등록일시 기준 정렬을 통한 TODO 목록 가져오기
 *     tags:
 *       - todos
 *     operationId: get-todos
 *     parameters:
 *       - name: status
 *         in: query
 *         description:
 *           완료 상태에 따른 TODO 목록 필터링<br/>
 *           빈 값일 경우 전체 목록 반환<br/>
 *           complete 완료된 TODO 목록 반환<br/>
 *           incomplete 완료되지 않은 TODO 목록 반환
 *         required: false
 *         schema:
 *           type: string
 *           enum: [complete, incomplete]
 *       - name: sort
 *         in: query
 *         description:
 *           등록일시 기준 정렬<br/>
 *           asc 오름차순 정렬 (오래된 순)<br/>
 *           desc 내림차순 정렬 (최신 순)
 *         required: true
 *         default: desc
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - name: type
 *         in: query
 *         description:
 *           특정 필드로 TODO 목록 검색<br/>
 *           title 제목으로 검색<br/>
 *           content 내용으로 검색
 *         required: true
 *         default: title
 *         schema:
 *           type: string
 *           enum: [title, content]
 *       - name: keyword
 *         in: query
 *         description: 필드(type)에 대한 검색 키워드
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 요청에 대한 TODO 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 고유 ID
 *                   title:
 *                     type: string
 *                     description: 제목
 *                   content:
 *                     type: string
 *                     description: 내용
 *                   is_completed:
 *                     type: boolean
 *                     description: 완료 여부
 *                   completed_at:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description:
 *                       완료 일시<br/>
 *                       is_completed가 true일 경우 date-time, false일 경우 null
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: 생성 일시
 *       400:
 *         description: 잘못된 쿼리 파라미터
 *       500:
 *         description: 내부 서버 오류
 */
router.get('/', validateRequest, handleGetTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: TODO 상세 조회
 *     description: TODO 고유 ID로 TODO 상세 가져오기
 *     tags:
 *       - todos
 *     operationId: get-todo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: TODO 고유 ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 요청에 대한 TODO 상세 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 고유 ID
 *                 title:
 *                   type: string
 *                   description: 제목
 *                 content:
 *                   type: string
 *                   description: 내용
 *                 is_completed:
 *                   type: boolean
 *                   description: 완료 여부
 *                 completed_at:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   description:
 *                     완료 일시<br/>
 *                     is_completed가 true일 경우 date-time, false일 경우 null
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: 생성 일시
 *       404:
 *         description: 해당 TODO가 존재하지 않음
 *       500:
 *         description: 내부 서버 오류
 */
router.get('/:id', validateRequest, handleGetTodo);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: TODO 추가
 *     description: 제목/내용으로 구성된 TODO 추가하기
 *     tags:
 *       - todos
 *     operationId: create-todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: |
 *                   TODO 제목<br/>
 *                   최소 1자 / 최대 50자
 *               content:
 *                 type: string
 *                 description: |
 *                   TODO 내용<br/>
 *                   최소 1자 / 최대 500자
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: 추가한 TODO 반환
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: 고유 ID
 *                  title:
 *                    type: string
 *                    description: 요청한 제목
 *                  content:
 *                    type: string
 *                    description: 요청한 내용
 *                  is_completed:
 *                    type: boolean
 *                    description:
 *                      완료 여부<br/>
 *                      추가일 경우 항상 false
 *                  completed_at:
 *                    type: string
 *                    format: date-time
 *                    nullable: true
 *                    description:
 *                      완료 일시<br/>
 *                      추가일 경우 항상 null
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *                    description: 요청한 일시
 *       400:
 *         description: 잘못된 쿼리 파라미터
 *       500:
 *         description: 내부 서버 오류
 */
router.post('/', validateRequest, handleCreateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: TODO 삭제
 *     description: TODO 고유 ID로 TODO 삭제하기
 *     tags:
 *       - todos
 *     operationId: delete-todo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: TODO 고유 ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 요청이 성공하였으며 반환할 컨텐츠가 없음
 *       404:
 *         description: 해당 TODO가 존재하지 않음
 *       500:
 *         description: 내부 서버 오류
 */
router.delete('/:id', validateRequest, handleDeleteTodo);

export default router;
