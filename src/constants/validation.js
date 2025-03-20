export const validationRules = {
  'GET:/api/todos': {
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
  'GET:/api/todos/{id}': {
    id: {
      required: true
    }
  },
  'POST:/api/todos': {
    title: {
      required: true,
      length: { min: 1, max: 50 }
    },
    content: {
      required: true,
      length: { min: 1, max: 500 }
    }
  }
};
