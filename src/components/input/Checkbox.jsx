import React from 'react'
import styles from './Checkbox.module.sass'

const Checkbox = ({ id, title, status, onChange }) => {
  return (
    <div className={styles.checkbox_container}>
      <label className={styles.label} htmlFor={id}>
        <input type="checkbox" id={id} checked={status} onChange={() => onChange(id)}></input>
        <span className={styles.checkmark}></span>
        {title.startsWith('http') ? (
          <a href={title} target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </label>
    </div>
  )
}

export default Checkbox
