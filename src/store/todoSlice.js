import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    {
      categoryName: 'Kanban tasks',
      statuses: [
        {
          statusName: 'todo',
          todos: [
            {
              id: 1,
              title: 'View carts for tasks',
              description: 'Make the ability to open task carts in modal window or new page.',
              subTasks: []
            },
            {
              id: 2,
              title: 'Change tasks',
              description:
                'Make the functionality of changing tasks titles and descriptions, also changing their status.',
              subTasks: []
            }
          ]
        },
        {
          statusName: 'done',
          todos: [
            { id: 3, title: 'Basic UI', description: 'Make all the basic ui', subTasks: [] },
            {
              id: 4,
              title: 'Basic functionality',
              description:
                'Make the abilities to create new boards, new tasks and new custom statuses for tasks.',
              subTasks: []
            }
          ]
        }
      ]
    },
    {
      categoryName: 'Global tasks',
      statuses: [
        {
          statusName: 'todo',
          todos: [
            {
              id: 5,
              title: 'Finish studying',
              description: 'Finish studying on react, next, redux, typescript.',
              subTasks: []
            }
          ]
        },
        {
          statusName: 'doing',
          todos: [
            {
              id: 7,
              title: 'Algorithms',
              description: 'Practice on leetcode and codewars.',
              subTasks: []
            }
          ]
        }
      ]
    }
  ]
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createBoard: (state, action) => {
      state.categories.push({ categoryName: action.payload, todos: [] })
    },
    createStatus: (state, action) => {
      const currentCategory = state.categories.findIndex(
        category => category.categoryName === action.payload.category
      )
      state.categories[currentCategory].statuses.push({
        statusName: action.payload.status,
        todos: []
      })
    },
    createTask: {
      reducer(state, action) {
        const currentCategoryId = state.categories.findIndex(
          category => category.categoryName === action.payload.category
        )
        const currentStatusId = state.categories[currentCategoryId].statuses.findIndex(
          status => status.statusName === 'todo'
        )
        state.categories[currentCategoryId].statuses[currentStatusId].todos.push(
          action.payload.task
        )
      },
      prepare(category, task) {
        return {
          payload: {
            category,
            task: {
              id: nanoid(),
              title: task.title,
              description: task.description,
              subTasks: [...task.subTasks]
            }
          }
        }
      }
    }
  }
})

export const { createBoard, createStatus, createTask } = todoSlice.actions

export default todoSlice.reducer
