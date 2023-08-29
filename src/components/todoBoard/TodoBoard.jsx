import React from 'react'
import styles from './TodoBoard.module.sass'
import TodoCart from './TodoCart'
import clsx from 'clsx'

const TodoBoard = ({ status }) => {
  const statusName = status.statusName.toLowerCase()
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
        {status.statusName} ({status.todos.length})
      </h2>
      {status.todos.length ? (
        status.todos.map(todo => <TodoCart key={todo.id} todo={todo} />)
      ) : (
        <div className={styles.empty}>Empty</div>
      )}
    </div>
  )
}

export default TodoBoard
