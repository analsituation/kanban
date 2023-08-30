import React from 'react'
import styles from './checkbox.module.sass'

const Checkbox = ({ title, status }) => {
  return (
    <div className={styles.checkbox_container}>
      <label className={styles.label} htmlFor={title}>
        <input type="checkbox" id={title} checked={status}></input>
        <span className={styles.checkmark}></span>
        {title}
      </label>
    </div>
  )
}

export default Checkbox
