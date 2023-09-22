import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Modal from '../modal/Modal'
import Input from '../input/Input'
import Button from '../button/Button'
import { createCategory } from '../../store/todoSlice'
import { selectCategories } from './../../store/selectors'

import styles from './Sidebar.module.sass'

const Sidebar = () => {
  const [modalShown, setModalShown] = useState(false)
  const [board, setBoard] = useState('')
  const categories = useSelector(selectCategories)

  const dispatch = useDispatch()

  const handleClick = () => {
    if (board.trim().length === 0) {
      toast('Write the category name')
      return
    }
    if (
      !categories.every(category => category.categoryName.toLowerCase() !== board.toLowerCase())
    ) {
      toast('Such a category already exists')
      return
    }
    dispatch(createCategory(board))
    setBoard('')
    setModalShown(false)
  }

  useEffect(() => {
    setBoard('')
  }, [modalShown])

  return (
    <aside className={styles.sidebar}>
      <Link to={'/'}>
        <div className={styles.logo}>
          {/* <div className={styles.logo_img}>
            <img src="#" alt="kanban" />
          </div> */}
          <span className={styles.logo_text}>kanban</span>
        </div>
      </Link>
      <div className={styles.sidebar_menu}>
        <div className={styles.boards_count}>all boards ({categories.length})</div>
        <div className={styles.categories}>
          {categories.map(category => (
            <NavLink
              to={`/category/${category.categorySlug}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
              key={category.categoryName}
            >
              <span>{category.categoryName}</span>
            </NavLink>
          ))}
        </div>
        <div onClick={() => setModalShown(true)} className={styles.create_board}>
          Create new board
        </div>
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
        <Button clickHandler={handleClick}>Add new board</Button>
      </Modal>
    </aside>
  )
}

export default Sidebar
