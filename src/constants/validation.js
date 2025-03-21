export const validationRules = {
  'GET:/api/todos': {
    query: {
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
    }
  },
  'GET:/api/todos/{id}': {
    params: {
      id: {
        required: true
      }
    }
  },
  'POST:/api/todos': {
    body: {
      title: {
        required: true,
        length: { min: 1, max: 50 }
      },
      content: {
        required: true,
        length: { min: 1, max: 500 }
      }
    }
  },
  'PUT:/api/todos/{id}': {
    params: {
      id: {
        required: true
      }
    },
    body: {
      title: {
        required: true,
        length: { min: 1, max: 50 }
      },
      content: {
        required: true,
        length: { min: 1, max: 500 }
      },
      is_completed: {
        required: true,
        enum: [true, false]
      }
    }
  },
  'DELETE:/api/todos/{id}': {
    params: {
      id: {
        required: true
      }
    }
  }
};
