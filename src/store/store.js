import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from './todoSlice'

const RootReducer = combineReducers({
  todos: todosReducer
})

export const store = configureStore({
  reducer: RootReducer
})
