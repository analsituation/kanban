import React from 'react'
import styles from './Button.module.sass'
import clsx from 'clsx'

const Button = ({ children, clickHandler, light, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={clsx(styles.button, light && styles.light, disabled && styles.disabled)}
    >
      {children}
    </button>
  )
}

export default Button
