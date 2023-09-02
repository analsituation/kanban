import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

import styles from './Layout.module.sass'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
