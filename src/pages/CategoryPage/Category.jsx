import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import clsx from 'clsx'

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
  const { categorySlug } = useParams()
  const dispatch = useDispatch()

  const categoryInfo = useSelector(state => selectCurrentCategory(state, categorySlug))
  if (!categoryInfo) {
    return <NotFound />
  }

  const statuses = categoryInfo.statuses

  const getTodosByStatus = status => {
    return categoryInfo.todos.filter(todo => todo.status === status)
  }

  const handleClick = () => {
    if (status.trim().length === 0) {
      toast('Write the status')
      return
    }
    if (!statuses.every(element => element.toLowerCase() !== status.toLowerCase())) {
      toast('Such a status already exists')
      return
    }
    dispatch(createNewStatus({ category: categorySlug, status: status.toLowerCase() }))
    setStatus('')
    setModalShown(false)
  }

  useEffect(() => {
    setStatus('')
  }, [modalShown])

  return (
    <div className={styles.categories}>
      {categoryInfo.todos &&
        statuses.map(board => (
          <TodoBoard key={board} status={board} todos={getTodosByStatus(board)} />
        ))}
      <div
        onClick={() => setModalShown(true)}
        className={clsx(styles.newColumn, statuses.length > 1 && styles.third_column)}
      >
        + Add new status
      </div>
      <Modal title="Create new status" shown={modalShown} setModalShown={setModalShown}>
        <Input
          name={null}
          value={status}
          onChange={setStatus}
          type="text"
          placeholder="e.g. DOING"
          label="Status name"
        />
        <Button clickHandler={handleClick}>Add new status</Button>
      </Modal>
    </div>
  )
}

export default Category
