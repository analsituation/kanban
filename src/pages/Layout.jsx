import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.sass'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import Modal from '../components/modal/Modal'
import Button from '../components/button/Button'
import Input from '../components/input/Input'
import { useDispatch } from 'react-redux'
import { createBoard } from '../store/todoSlice'

const Layout = () => {
  const [modalShown, setModalShown] = useState(false)
  const [board, setBoard] = useState('')
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar setModalShown={setModalShown} />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Modal title="Create new board" shown={modalShown} setModalShown={setModalShown}>
        <Input
          name={null}
          value={board}
          onChange={setBoard}
          type="text"
          placeholder="New board"
          label="Board title"
        />
        <Button
          clickHandler={() => {
            dispatch(createBoard(board))
            setBoard('')
            setModalShown(false)
          }}
        >
          Add new board
        </Button>
      </Modal>
    </div>
  )
}

export default Layout
