import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import styles from './TodoCart.module.sass'
import Modal from '../modal/Modal'
import Checkbox from '../input/checkbox'
import { selectStatusesOfCategory } from '../../store/selectors'
import clsx from 'clsx'

const TodoCart = ({ todo }) => {
  const [modalShown, setModalShown] = useState(false)
  const { category } = useParams()

  const status = useSelector(state => selectStatusesOfCategory(state, category))

  const options = [
    ...status.statuses.map(status => ({
      value: status.statusName.toLowerCase(),
      label: status.statusName.toUpperCase()
    }))
  ]

  return (
    <>
      <div onClick={() => setModalShown(true)} className={styles.todoCart}>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.desc}>{todo.description}</p>
      </div>
      <Modal title={todo.title} shown={modalShown} setModalShown={setModalShown}>
        <p className={styles.desc}>{todo.description}</p>
        <div className={styles.subtasks_block}>
          {todo.subTasks.length ? (
            <>
              <div className={styles.subtasks_title}>
                Subtasks ({todo.subTasks.length} of {todo.subTasks.length})
              </div>
              <div div className={styles.subtasks_block}>
                {todo.subTasks.map(st => (
                  <Checkbox title={st.title} status={st.completed} />
                ))}
              </div>
            </>
          ) : (
            <div>No subtasks</div>
          )}
        </div>

        <div className={styles.status}>
          Status
          <Select
            options={options}
            className={clsx(styles.select, {
              control: state => (state.isFocused ? 'border-accent' : 'border-dark')
            })}
            isClearable={false}
            isSearchable={false}
          />
        </div>
      </Modal>
    </>
  )
}

export default TodoCart
