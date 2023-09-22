import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Modal from '../modal/Modal'
import Input from '../input/Input'
import Button from '../button/Button'
import { createCategory, deleteCategory } from '../../store/todoSlice'
import { selectCategories } from './../../store/selectors'

import styles from './Sidebar.module.sass'

const Sidebar = () => {
  const [modalAddShown, setModalAddShown] = useState(false)
  const [modalDelShown, setModalDelShown] = useState(false)
  const [categoryModal, setCategoryModal] = useState({})
  const [board, setBoard] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const inputFocusRef = useRef(null)

  const categories = useSelector(selectCategories)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddClick = () => {
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
    setModalAddShown(false)
  }

  const handleDelClick = slug => {
    dispatch(deleteCategory(slug))
    setShouldRedirect(true)
    setModalDelShown(false)
  }

  useEffect(() => {
    if (shouldRedirect) {
      setShouldRedirect(false)
      navigate('/', { replace: true })
    }
  }, [shouldRedirect])

  useEffect(() => {
    if (!modalDelShown) {
      inputFocusRef.current.focus()
    }
    setBoard('')
  }, [modalAddShown])

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
              <div>
                {category.categoryName}
                <span
                  className={styles.delete_button}
                  onClick={() => {
                    setModalDelShown(true)
                    setCategoryModal(category)
                  }}
                >
                  &times;
                </span>
              </div>
            </NavLink>
          ))}
        </div>
        <div onClick={() => setModalAddShown(true)} className={styles.create_board}>
          Create new board
        </div>
      </div>
      <Modal title="Create new board" shown={modalAddShown} setModalShown={setModalAddShown}>
        <Input
          ref={inputFocusRef}
          name={null}
          value={board}
          onChange={setBoard}
          type="text"
          placeholder="New board"
          label="Board title"
        />
        <Button clickHandler={handleAddClick}>Add new board</Button>
      </Modal>
      <Modal
        title={`Are you sure you want to delete ${categoryModal.categoryName}?`}
        shown={modalDelShown}
        setModalShown={setModalDelShown}
      >
        <Button clickHandler={() => handleDelClick(categoryModal.categorySlug)}>Yes</Button>
      </Modal>
    </aside>
  )
}

export default Sidebar
