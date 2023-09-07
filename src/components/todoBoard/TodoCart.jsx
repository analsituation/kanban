import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { toast } from 'react-toastify'

import Checkbox from '../input/Checkbox'
import Modal from '../modal/Modal'
import Button from '../button/Button'
import { selectStatusesOfCategory } from '../../store/selectors'
import { changeTask, deleteTask } from '../../store/todoSlice'
import { isEqual } from './../../utils/isEqual'

import styles from './TodoCart.module.sass'

const TodoCart = ({ todo }) => {
  const [modalShown, setModalShown] = useState(false)
  const [changeTaskData, setChangeTaskData] = useState(todo)
  const { categoryName } = useParams()

  const statuses = useSelector(state => selectStatusesOfCategory(state, categoryName))
  const dispatch = useDispatch()

  const options = [
    ...statuses.map(status => ({
      value: status,
      label: status
    }))
  ]

  const currentStatus = options.findIndex(option => option.value === todo.status)

  const handleChangeCheckbox = currentId => {
    const changedTodo = {
      ...changeTaskData,
      subTasks: [
        ...changeTaskData.subTasks.map(st => {
          if (st.id === currentId) {
            return {
              ...st,
              completed: !st.completed
            }
          } else return st
        })
      ]
    }
    setChangeTaskData(changedTodo)
  }

  const handleChangeStatus = e => {
    const changedTodo = {
      ...changeTaskData,
      status: e.value
    }
    setChangeTaskData(changedTodo)
  }

  const handleDeleteTask = id => {
    dispatch(deleteTask({ category: categoryName, todoId: id }))
    setModalShown(false)
    toast('Task deleted successfully')
  }

  const completedSubTasks = todo.subTasks.filter(st => st.completed === true)

  return (
    <>
      <div onClick={() => setModalShown(true)} className={styles.todoCart}>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.desc}>{todo.description}</p>
      </div>
      <Modal
        title={todo.title}
        todoId={todo.id}
        shown={modalShown}
        setModalShown={setModalShown}
        editable={true}
        deleteTask={() => handleDeleteTask(todo.id)}
      >
        <p className={styles.desc}>{todo.description}</p>
        <div className={styles.subtasks_block}>
          {todo.subTasks.length ? (
            <>
              <div className={styles.subtasks_title}>
                Subtasks ({completedSubTasks.length} of {todo.subTasks.length})
              </div>
              <div className={styles.subtasks_block}>
                {changeTaskData.subTasks.map(st => (
                  <Checkbox
                    key={st.id}
                    id={st.id}
                    title={st.title}
                    status={st.completed}
                    onChange={handleChangeCheckbox}
                  />
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
            onChange={e => handleChangeStatus(e)}
            options={options}
            defaultValue={options[currentStatus]}
            className={styles.select}
            isClearable={false}
            isSearchable={false}
          />
        </div>
        <Button
          disabled={isEqual(todo, changeTaskData)}
          clickHandler={() => {
            dispatch(changeTask(categoryName, changeTaskData))
            setModalShown(false)
          }}
        >
          Save
        </Button>
      </Modal>
    </>
  )
}

export default TodoCart
