import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeSidebar: (state, action) => action.payload
  }
})

export const { changeSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
