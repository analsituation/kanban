import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TodoBoard from '../../components/todoBoard/TodoBoard'
import NotFound from '../HomePage/NotFound'
import Modal from '../../components/modal/Modal'
import Input from './../../components/input/Input'
import Button from './../../components/button/Button'
import { createNewStatus } from '../../store/todoSlice'
import { selectCurrentCategory } from '../../store/selectors'

import styles from './Category.module.sass'

const Category = () => {
  const [modalShown, setModalShown] = useState(false)
  const [status, setStatus] = useState('')
  const { categoryName } = useParams()
  const dispatch = useDispatch()

  const categoryInfo = useSelector(state => selectCurrentCategory(state, categoryName))
  if (!categoryInfo) {
    return <NotFound />
  }

  const statuses = categoryInfo.statuses

  const getTodosByStatus = status => {
    return categoryInfo.todos.filter(todo => todo.status === status)
  }

  return (
    <div className={styles.categories}>
      {categoryInfo.todos &&
        statuses.map(board => (
          <TodoBoard key={board} status={board} todos={getTodosByStatus(board)} />
        ))}
      <div onClick={() => setModalShown(true)} className={styles.newColumn}>
        + New Column
      </div>
      <Modal title="Create new status" shown={modalShown} setModalShown={setModalShown}>
        <Input
          name={null}
          value={status}
          onChange={setStatus}
          type="text"
          placeholder="New status"
          label="Status name"
        />
        <Button
          clickHandler={() => {
            dispatch(createNewStatus({ category: categoryName, status }))
            setStatus('')
            setModalShown(false)
          }}
        >
          Add new board
        </Button>
      </Modal>
    </div>
  )
}

export default Category
