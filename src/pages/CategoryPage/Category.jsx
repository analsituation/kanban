import React, { useEffect, useState } from 'react'
import { useParams, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatusesOfCategory } from '../../store/selectors'

import { createStatus } from '../../store/todoSlice'
import TodoBoard from '../../components/todoBoard/TodoBoard'
import Modal from '../../components/modal/Modal'
import Input from './../../components/input/Input'
import Button from './../../components/button/Button'

import styles from './Category.module.sass'
import NotFound from '../HomePage/NotFound'

const Category = () => {
  const [modalShown, setModalShown] = useState(false)
  const [status, setStatus] = useState('')

  const { category } = useParams()
  const columns = useSelector(state => selectStatusesOfCategory(state, category))

  const dispatch = useDispatch()

  if (!columns) {
    return <NotFound />
  }

  return (
    <div className={styles.categories}>
      {columns.statuses &&
        columns.statuses.map(col => <TodoBoard key={col.statusName} status={col} />)}
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
            dispatch(createStatus({ status, category: columns.categoryName }))
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
