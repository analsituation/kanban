import React, { useState } from 'react'
import styles from './TodoCart.module.sass'
import Modal from '../modal/Modal'
import Checkbox from '../input/checkbox'

const TodoCart = ({ todo }) => {
  const [modalShown, setModalShown] = useState(false)

  return (
    <>
      <div onClick={() => setModalShown(true)} className={styles.todoCart}>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.desc}>{todo.description}</p>
      </div>
      <Modal title={todo.title} shown={modalShown} setModalShown={setModalShown}>
        <p className="text-secondText">{todo.description}</p>
        {!!todo.subTasks.length && (
          <div className={styles.subtasks}>
            <h3>
              Subtasks ({todo.subTasks.length} of {todo.subTasks.length})
            </h3>
            {todo.subTasks.map(st => (
              <Checkbox title={st.title} />
            ))}
          </div>
        )}
        {/* <div className={styles.status}>
          <select name="asd" id="asd">
            <option value=""></option>
          </select>
        </div> */}
      </Modal>
    </>
  )
}

export default TodoCart
