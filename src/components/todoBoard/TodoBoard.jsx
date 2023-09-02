import React from 'react'
import clsx from 'clsx'

import TodoCart from './TodoCart'

import styles from './TodoBoard.module.sass'

const TodoBoard = ({ status, todos }) => {
  const statusName = status.toLowerCase()

  return (
    <div className={styles.column}>
      <h2
        className={clsx(
          styles.statusName,
          statusName === 'todo' && styles.todo,
          statusName === 'doing' && styles.doing,
          statusName === 'done' && styles.done
        )}
      >
        {status} ({todos.length})
      </h2>
      {todos.length ? (
        todos.map(todo => <TodoCart key={todo.id} todo={todo} />)
      ) : (
        <div className={styles.empty}>Empty</div>
      )}
    </div>
  )
}

export default TodoBoard
