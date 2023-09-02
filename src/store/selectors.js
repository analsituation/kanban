import { createSelector } from '@reduxjs/toolkit'

export const selectCategories = state => state.todos.categories
export const selectStatuses = state => state.todos.statuses

export const selectCurrentCategory = createSelector(
  [selectCategories, (state, category) => category],
  (categories, categoryName) => categories.filter(cat => cat.categoryName === categoryName)[0]
)

export const selectStatusesOfCategory = createSelector(
  [selectCurrentCategory],
  currentCategory => currentCategory.statuses
)

export const selectTodosOfCategory = createSelector([selectCurrentCategory], category => {
  return category.todos
})
