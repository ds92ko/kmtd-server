export const paramsMap = {
  '/api/todos': {
    status: {
      required: false,
      enum: ['complete', 'incomplete']
    },
    sort: {
      required: true,
      enum: ['asc', 'desc']
    },
    type: {
      required: true,
      enum: ['title', 'content']
    },
    keyword: {
      required: false
    }
  },
  '/api/todos/add': {
    title: {
      required: true
    },
    content: {
      required: true
    }
  }
};
