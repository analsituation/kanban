import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import TodoBoard from '../../components/todoBoard/TodoBoard'
import NotFound from '../HomePage/NotFound'
import Modal from '../../components/modal/Modal'
import Input from './../../components/input/Input'
import Button from './../../components/button/Button'
import { createNewStatus, deleteStatusCategory } from '../../store/todoSlice'
import { selectCurrentCategory } from '../../store/selectors'

import styles from './Category.module.sass'

const Category = () => {
  const [modalAddShown, setModalAddShown] = useState(false)
  const [modalDelShown, setModalDelShown] = useState(false)
  const [statusModal, setStatusModal] = useState('')
  const [status, setStatus] = useState('')
  const inputFocusRef = useRef(null)

  const { categorySlug } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!modalDelShown) {
      inputFocusRef.current.focus()
    }
    setStatus('')
  }, [modalAddShown])

  const categoryInfo = useSelector(state => selectCurrentCategory(state, categorySlug))
  if (!categoryInfo) {
    return <NotFound />
  }

  const statuses = categoryInfo.statuses

  const getTodosByStatus = status => {
    return categoryInfo.todos.filter(todo => todo.status === status)
  }

  const handleAddClick = () => {
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
    setModalAddShown(false)
  }

  const handleDelSClick = () => {
    dispatch(deleteStatusCategory({ category: categorySlug, status: statusModal }))
    setModalDelShown(false)
  }

  return (
    <div className={styles.categories}>
      {categoryInfo.todos &&
        statuses.map(board => (
          <TodoBoard
            clickHandler={status => {
              setModalDelShown(true)
              setStatusModal(status)
            }}
            key={board}
            status={board}
            todos={getTodosByStatus(board)}
          />
        ))}
      <div
        onClick={() => setModalAddShown(true)}
        className={clsx(styles.newColumn, statuses.length > 1 && styles.third_column)}
      >
        + Add new status
      </div>
      <Modal title="Create new status" shown={modalAddShown} setModalShown={setModalAddShown}>
        <Input
          ref={inputFocusRef}
          name={null}
          value={status}
          onChange={setStatus}
          type="text"
          placeholder="e.g. DOING"
          label="Status name"
        />
        <Button clickHandler={handleAddClick}>Add new status</Button>
      </Modal>
      <Modal
        title={`Are you sure you want to delete "${statusModal}" status?`}
        shown={modalDelShown}
        setModalShown={setModalDelShown}
      >
        <Button clickHandler={handleDelSClick}>Yes</Button>
      </Modal>
    </div>
  )
}

export default Category
