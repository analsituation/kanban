import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

import 'react-toastify/dist/ReactToastify.css'
import styles from './Layout.module.sass'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default Layout
