import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import Modal from '../modal/Modal'
import Input from '../input/Input'
import Button from '../button/Button'
import { createCategory, deleteCategory } from '../../store/todoSlice'
import { selectCategories } from './../../store/selectors'
import { useSidebarStatus } from '../../hooks/sidebarStatus'

import styles from './Sidebar.module.sass'

const Sidebar = () => {
  const [modalAddShown, setModalAddShown] = useState(false)
  const [modalDelShown, setModalDelShown] = useState(false)
  const [categoryModal, setCategoryModal] = useState({})
  const [board, setBoard] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const inputFocusRef = useRef(null)

  const categories = useSelector(selectCategories)

  const [sidebarHide, setSidebarHide] = useSidebarStatus()

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
    if (!modalDelShown && inputFocusRef.current) {
      inputFocusRef.current.focus()
    }
    setBoard('')
  }, [modalAddShown])

  return (
    <aside className={clsx(styles.sidebar, sidebarHide && styles.hidden_sidebar)}>
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
      <div
        onClick={() => setSidebarHide(prev => !prev)}
        className={clsx(styles.hide_button, sidebarHide && styles.hidden_button)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
        </svg>
      </div>
    </aside>
  )
}

export default Sidebar
