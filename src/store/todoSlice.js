import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    {
      categoryName: 'Kanban tasks',
      statuses: ['todo', 'done'],
      todos: [
        {
          status: 'todo',
          id: 1,
          title: 'View carts for tasks',
          description: 'Make the ability to open task carts in modal window or new page.',
          subTasks: [
            { id: 0, title: 'asd dddd aaaaaaaaaaaaaaa', completed: false },
            { id: 1, title: 'Some text', completed: true }
          ]
        },
        {
          status: 'todo',
          id: 2,
          title: 'Change tasks',
          description:
            'Make the functionality of changing tasks titles and descriptions, also changing their status.',
          subTasks: []
        },
        {
          status: 'done',
          id: 4,
          title: 'Basic functionality',
          description:
            'Make the abilities to create new boards, new tasks and new custom statuses for tasks.',
          subTasks: []
        },
        {
          status: 'done',
          id: 3,
          title: 'Basic UI',
          description: 'Make all the basic ui',
          subTasks: []
        }
      ]
    },
    {
      categoryName: 'Global tasks',
      statuses: ['todo', 'doing'],
      todos: [
        {
          status: 'todo',
          id: 5,
          title: 'Finish studying',
          description: 'Finish studying on react, next, redux, typescript.',
          subTasks: []
        },
        {
          status: 'doing',
          id: 7,
          title: 'Algorithms',
          description: 'Practice on leetcode and codewars.',
          subTasks: []
        }
      ]
    }
  ]
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.categories.push({ categoryName: action.payload, todos: [] })
    },
    createNewStatus: (state, action) => {
      const currentCategory = state.categories.find(
        category => category.categoryName === action.payload.category
      )
      currentCategory.statuses.push(action.payload.status)
    },
    createTask: {
      reducer(state, action) {
        const currentCategory = state.categories.find(
          category => category.categoryName === action.payload.category
        )
        currentCategory.todos.push(action.payload.task)
      },
      prepare(category, task) {
        return {
          payload: {
            category,
            task: {
              status: 'todo',
              id: nanoid(),
              title: task.title,
              description: task.description,
              subTasks: task.subTasks.map(subtask => ({
                id: nanoid(),
                title: subtask.title,
                completed: false
              }))
            }
          }
        }
      }
    },
    changeTask: {
      reducer(state, action) {
        const currentCategory = state.categories.find(
          category => category.categoryName === action.payload.category
        )
        const currentTodo = currentCategory.todos.find(task => task.id === action.payload.task.id)
        currentTodo.status = action.payload.task.status
        currentTodo.subTasks = [...action.payload.task.subTasks]
      },
      prepare(category, task) {
        return {
          payload: {
            category,
            task: {
              ...task,
              subTasks: [...task.subTasks]
            }
          }
        }
      }
    }
  }
})

export const { createCategory, createNewStatus, createTask, changeTask } = todoSlice.actions

export default todoSlice.reducer
