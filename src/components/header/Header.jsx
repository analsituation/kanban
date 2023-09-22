import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import Modal from '../modal/Modal'
import Input from '../input/Input'
import Label from '../label/Label'
import Button from '../button/Button'
import { createTask } from '../../store/todoSlice'
import { selectCategories, selectCurrentCategory } from '../../store/selectors'

import styles from './Header.module.sass'

const Header = () => {
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

  const { categorySlug } = useParams()
  const location = useLocation()
  const categories = useSelector(selectCategories)

  let existingCategory
  if (categories) {
    existingCategory = !!categories.find(el => el.categorySlug === categorySlug)
  }

  const categoryInfo = useSelector(state => selectCurrentCategory(state, categorySlug))
  const categoryName = categoryInfo ? categoryInfo.categoryName : ''

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

  const handleCreateTask = () => {
    if (taskData.title.trim().length === 0 || taskData.description.trim().length === 0) {
      toast('Write all the necessary data')
      return
    }
    const notEmptySubTasks = taskData.subTasks.filter(st => st.title.trim().length !== 0)
    const task = {
      ...taskData,
      subTasks: [...notEmptySubTasks]
    }
    dispatch(createTask(categorySlug, task))
    setTaskData(emptyData)
    setModalShown(false)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.main_line}>
          <span className={styles.category_route}>
            {existingCategory ? categoryName : 'Platform Launch'}
          </span>
          <span className={styles.add_button}>
            <Button
              disabled={!existingCategory && location.pathname !== '/'}
              clickHandler={() => {
                location.pathname !== '/' ? setModalShown(true) : toast('Chose category')
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
        <p className={styles.createtask_info}>*Every new tasks adds to "Todo" category</p>
        <Button clickHandler={handleCreateTask}>Add new task</Button>
      </Modal>
    </>
  )
}

export default Header
