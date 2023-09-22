import { createSlice, nanoid } from '@reduxjs/toolkit'
import { mockTasks } from './mock-data'
import { slugify } from '../utils/slugHelper'

const initialState = mockTasks

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createCategory: {
      reducer(state, action) {
        state.categories.push({
          categoryName: action.payload.categoryName,
          categorySlug: action.payload.slug,
          statuses: ['todo'],
          todos: []
        })
      },
      prepare(categoryName) {
        return {
          payload: {
            categoryName: categoryName,
            slug: slugify(categoryName)
          }
        }
      }
    },
    createNewStatus: (state, action) => {
      const currentCategory = state.categories.find(
        category => category.categorySlug === action.payload.category
      )
      currentCategory.statuses.push(action.payload.status)
    },
    createTask: {
      reducer(state, action) {
        const currentCategory = state.categories.find(
          category => category.categorySlug === action.payload.category
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
          category => category.categorySlug === action.payload.category
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
    },
    deleteTask: (state, action) => {
      const currentCategory = state.categories.find(
        category => category.categorySlug === action.payload.category
      )
      const currentTodo = currentCategory.todos.findIndex(todo => todo.id === action.payload.todoId)
      currentCategory.todos.splice(currentTodo, 1)
    }
  }
})

export const { createCategory, createNewStatus, createTask, changeTask, deleteTask } =
  todoSlice.actions

export default todoSlice.reducer
