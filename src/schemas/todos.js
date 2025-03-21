const id = {
  type: 'integer',
  description: '고유 ID'
};

const title = {
  type: 'string',
  description: '제목'
};

const content = {
  type: 'string',
  description: '내용'
};

const is_completed = {
  type: 'boolean',
  description: '완료 여부'
};

const completed_at = {
  type: ['string', 'null'],
  format: 'date-time',
  description: '완료 일시'
};

const created_at = {
  type: 'string',
  format: 'date-time',
  description: '생성 일시'
};

export const TodoStatus = {
  type: 'string',
  enum: ['complete', 'incomplete'],
  description:
    '완료 상태에 따른 TODO 목록 필터링\n\n빈 값일 경우 전체 목록 반환\n\ncomplete 완료된 TODO 목록 반환\n\nincomplete 완료되지 않은 TODO 목록 반환'
};

export const TodoSort = {
  type: 'string',
  required: true,
  enum: ['asc', 'desc'],
  description: '등록일시 기준 정렬\n\nasc 오름차순 정렬 (오래된 순)\n\ndesc 내림차순 정렬 (최신 순)'
};

export const TodoSearchType = {
  type: 'string',
  required: true,
  enum: ['title', 'content'],
  description: '특정 필드로 TODO 목록 검색\n\ntitle 제목으로 검색\n\ncontent 내용으로 검색'
};

export const TodoId = {
  type: 'string',
  required: true,
  format: 'integer',
  description: 'TODO 고유 ID'
};

export const Todo = {
  type: 'object',
  required: ['id', 'title', 'content', 'is_completed', 'completed_at', 'created_at'],
  properties: { id, title, content, is_completed, completed_at, created_at },
  description: 'TODO 항목'
};

export const Todos = {
  type: 'array',
  items: Todo,
  description: 'TODO 목록'
};

export const AddableTodo = {
  type: 'object',
  required: ['title', 'content'],
  properties: { title, content },
  description: 'TODO 추가 요청 시 필요한 항목'
};

export const EditableTodo = {
  type: 'object',
  properties: { title, content, is_completed },
  description:
    'TODO 수정 요청 시 필요한 항목\n\nPUT 요청일 경우 전부 필수\n\nPATCH 요청일 경우 수정할 항목만 포함'
};

export const TodoCount = {
  type: 'object',
  required: ['total', 'complete', 'incomplete'],
  properties: {
    total: { type: 'integer', description: '전체 TODO 개수' },
    complete: { type: 'integer', description: '완료된 TODO 개수' },
    incomplete: { type: 'integer', description: '완료되지 않은 TODO 개수' }
  },
  description: 'TODO 개수'
};
