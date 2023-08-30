import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Header.module.sass'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import Input from '../input/Input'
import { createTask } from '../../store/todoSlice'
import Label from '../label/Label'

const Header = () => {
  const { category } = useParams()
  const emptyData = {
    title: '',
    description: '',
    subTasks: [
      { id: 0, title: '', completed: false },
      { id: 1, title: '', completed: false }
    ]
  }

  const [modalShown, setModalShown] = useState(false)
  const [taskData, setTaskData] = useState(emptyData)
  const dispatch = useDispatch()

  const deleteSubtask = index => {
    setTaskData({
      ...taskData,
      subTasks: taskData.subTasks.filter(st => st.id !== index)
    })
  }
  const addSubTask = () => {
    const id = Date.now()
    setTaskData({
      ...taskData,
      subTasks: [...taskData.subTasks, { id, title: '', completed: false }]
    })
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.main_line}>
          <span className={styles.category_route}>{category ? category : 'Platform Launch'}</span>
          <span className={styles.add_button}>
            <Button
              clickHandler={() => {
                category ? setModalShown(true) : toast('Chose category')
              }}
            >
              + Add task
            </Button>
          </span>
        </div>
      </header>

      <Modal title="Create new task" shown={modalShown} setModalShown={setModalShown}>
        <Label label_title="Task title">
          <Input
            name="title"
            value={taskData}
            onChange={setTaskData}
            type="text"
            placeholder="Task title"
          />
        </Label>

        <Label label_title="Task description">
          <Input
            name="description"
            value={taskData}
            onChange={setTaskData}
            type="text"
            placeholder="Task description"
          />
        </Label>

        <Label label_title="Subtasks">
          {!!taskData.subTasks.length &&
            taskData.subTasks.map(subTask => (
              <div key={subTask.id} className={styles.subtask_container}>
                <Input
                  name={`subtask_${subTask.id}`}
                  value={taskData}
                  onChange={setTaskData}
                  type="text"
                  placeholder="e.g. Make coffee"
                  label="Subtasks"
                />
                <span onClick={() => deleteSubtask(subTask.id)}>&#10005;</span>
              </div>
            ))}
        </Label>
        <Button light={true} clickHandler={addSubTask}>
          More subtask
        </Button>
        <p className="text-secondText text-[1.2rem] mt-6">
          *Every new tasks adds to "Todo" category
        </p>
        <Button
          clickHandler={() => {
            dispatch(createTask(category, taskData))
            setTaskData(emptyData)
            setModalShown(false)
          }}
        >
          Add new task
        </Button>
      </Modal>
      <ToastContainer theme="dark" />
    </>
  )
}

export default Header
