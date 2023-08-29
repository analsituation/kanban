import React from 'react'
import styles from './Label.module.sass'

const Label = ({ children, label_title }) => {
  return (
    <label className={styles.label}>
      {label_title}
      {children}
    </label>
  )
}

export default Label
