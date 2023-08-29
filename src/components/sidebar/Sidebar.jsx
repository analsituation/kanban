import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Sidebar.module.sass'
import { useSelector } from 'react-redux'
import { selectCategories } from './../../store/selectors'

const Sidebar = ({ setModalShown }) => {
  const categories = useSelector(selectCategories)

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
              to={`/category/${category.categoryName}`}
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
    </aside>
  )
}

export default Sidebar
