import React from 'react'
import styles from './checkbox.module.sass'

const Checkbox = ({ title }) => {
  return (
    <div className={styles.checkbox_container}>
      <label className={styles.label} htmlFor={title}>
        <input type="checkbox" id={title}></input>
        <span class={styles.checkmark}></span>
        {title}
      </label>
    </div>
  )
}

export default Checkbox
