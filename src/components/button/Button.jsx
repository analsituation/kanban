import React from 'react'
import styles from './Button.module.sass'
import clsx from 'clsx'

const Button = ({ children, clickHandler, light }) => {
  return (
    <button onClick={clickHandler} className={clsx(styles.button, light && styles.light)}>
      {children}
    </button>
  )
}

export default Button
