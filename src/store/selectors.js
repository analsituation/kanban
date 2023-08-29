import { createSelector } from '@reduxjs/toolkit'

export const selectCategories = state => state.todos.categories

// Not memoised
// export const selectStatusesOfCategory = (state, category) => {
//   return state.todos.categories.filter(cat => cat.categoryName === category)
// }

export const selectStatusesOfCategory = createSelector(
  [state => state.todos.categories, (state, category) => category],
  (categories, category) => categories.filter(cat => cat.categoryName === category)[0]
)
