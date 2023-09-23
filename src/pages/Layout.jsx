import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

import 'react-toastify/dist/ReactToastify.css'
import styles from './Layout.module.sass'
import { useSidebarStatus } from '../hooks/sidebarStatus'
import clsx from 'clsx'

const Layout = () => {
  const [sidebarHide, setSidebarHide] = useSidebarStatus()

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={clsx(styles.content, sidebarHide && styles.sidebar_hidden)}>
        <Outlet />
      </div>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default Layout
