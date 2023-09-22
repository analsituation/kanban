import React from 'react'
import styles from './Input.module.sass'

const Input = React.forwardRef(({ type, placeholder, onChange, value, name }, ref) => {
  const handleFormChange = e => {
    if (name && !name.includes('subtask')) {
      onChange({
        ...value,
        subTasks: [...value.subTasks],
        [e.target.name]: e.target.value
      })
    } else if (name && name.includes('subtask')) {
      const index = +name.split('_')[1]
      onChange({
        ...value,
        subTasks: value.subTasks.map(st => (st.id == index ? { ...st, title: e.target.value } : st))
      })
    } else {
      onChange(e.target.value)
    }
  }

  let valueForInput = name ? value[name] : value
  if (name && !name.includes('subtask')) {
    valueForInput = value[name]
  } else if (name && name.includes('subtask')) {
    const id = +name.split('_')[1]
    const index = value.subTasks.findIndex(el => el.id === id)
    valueForInput = value.subTasks[index].title
  } else {
    valueForInput = value
  }

  return (
    <input
      ref={ref}
      name={name ? name : null}
      value={valueForInput}
      onChange={e => handleFormChange(e)}
      type={type}
      placeholder={placeholder}
      className={styles.input}
    />
  )
})

export default Input
