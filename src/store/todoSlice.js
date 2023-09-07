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
          title: 'Проверить instagram',
          description: 'Листать ленту 30мин. Смотреть reels 30мин.',
          subTasks: [
            { id: 0, title: 'reels', completed: false },
            { id: 1, title: 'видео из переписок', completed: true }
          ]
        },
        {
          status: 'todo',
          id: 2,
          title: 'Проверить тикток',
          description: '1ч смотреть тиктоки. Отправить минимум 20 видео друзьям.',
          subTasks: []
        },
        {
          status: 'done',
          id: 3,
          title: 'Покушать',
          description:
            'Пельмени. Хорошие пельмени это очень вкусно. На самом деле рецепт простой - много мяса, мало теста. Сперва готовим тонкое яичное тесто, с добавлением сливочного масла. Лук сладких сортов для образования бульончика и перец совсем немного... ',
          subTasks: [
            { id: 0, title: 'много мяса', completed: true },
            { id: 1, title: 'мало теста', completed: true }
          ]
        },
        {
          status: 'done',
          id: 4,
          title: 'Смотреть ютуб',
          description: 'Впитать ежедневную порцию контента',
          subTasks: [
            { id: 0, title: 'https://www.youtube.com/watch?v=g6zwP0VyFAk', completed: false },
            { id: 1, title: 'https://www.youtube.com/watch?v=DGBYO_KK2lQ', completed: false },
            { id: 2, title: 'https://www.youtube.com/watch?v=Bi4MO2P3DlI', completed: false }
          ]
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
          title: 'ЬЬДь',
          description:
            'Мой дед однажды сказал мне: "Никого не слушай и никому не доверяй"... Потом он еще что-то говорил, но я его уже не слушал.',
          subTasks: []
        },
        {
          status: 'doing',
          id: 7,
          title: 'biba',
          description:
            'Лучшая зарядка - это балтика девятка; Охранник рынка - единственный кто следит за базаром; На днях был в качалке, занимался с тренажерами... Тренарежры стали сильнее; Бегать за овцами - это удел баранов. Я бегу только за пивом;  Одна полоска - подлежащее, две - пора идти за хлебом; ',
          subTasks: [{ id: 0, title: 'UUUUUGGHHHH', completed: true }]
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
      state.categories.push({ categoryName: action.payload, statuses: ['todo'], todos: [] })
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
    },
    deleteTask: (state, action) => {
      const currentCategory = state.categories.find(
        category => category.categoryName === action.payload.category
      )
      const currentTodo = currentCategory.todos.findIndex(todo => todo.id === action.payload.itemId)
      currentCategory.todos.splice(currentTodo, 1)
    }
  }
})

export const { createCategory, createNewStatus, createTask, changeTask, deleteTask } =
  todoSlice.actions

export default todoSlice.reducer
