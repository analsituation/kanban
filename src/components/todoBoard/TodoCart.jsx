import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import styles from './TodoCart.module.sass'
import Modal from '../modal/Modal'
import Checkbox from '../input/checkbox'
import { selectStatusesOfCategory } from '../../store/selectors'
import clsx from 'clsx'

// const colourStyles = {
//   control: styles => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color)
//     return {
//       ...styles,
//       backgroundColor: isDisabled
//         ? undefined
//         : isSelected
//         ? data.color
//         : isFocused
//         ? color.alpha(0.1).css()
//         : undefined,
//       color: isDisabled
//         ? '#ccc'
//         : isSelected
//         ? chroma.contrast(color, 'white') > 2
//           ? 'white'
//           : 'black'
//         : data.color,
//       cursor: isDisabled ? 'not-allowed' : 'default',

//       ':active': {
//         ...styles[':active'],
//         backgroundColor: !isDisabled
//           ? isSelected
//             ? data.color
//             : color.alpha(0.3).css()
//           : undefined
//       }
//     }
//   },
//   input: styles => ({ ...styles }),
//   placeholder: styles => ({ ...styles }),
//   singleValue: (styles, { data }) => ({ ...styles })
// }

const TodoCart = ({ todo }) => {
  const [modalShown, setModalShown] = useState(false)
  const { category } = useParams()

  const status = useSelector(state => selectStatusesOfCategory(state, category))

  const options = [
    ...status.statuses.map(status => ({
      value: status.statusName.toLowerCase(),
      label: status.statusName.toUpperCase()
    }))
  ]

  return (
    <>
      <div onClick={() => setModalShown(true)} className={styles.todoCart}>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.desc}>{todo.description}</p>
      </div>
      <Modal title={todo.title} shown={modalShown} setModalShown={setModalShown}>
        <p className="text-secondText">{todo.description}</p>
        <div className={styles.subtasks}>
          {todo.subTasks.length ? (
            <>
              <div>
                Subtasks ({todo.subTasks.length} of {todo.subTasks.length})
              </div>
              {todo.subTasks.map(st => (
                <Checkbox title={st.title} status={st.completed} />
              ))}
            </>
          ) : (
            <div>No subtasks</div>
          )}
        </div>

        <div className={styles.status}>
          Status
          <Select
            options={options}
            className={clsx(styles.select, {
              control: state => (state.isFocused ? 'border-accent' : 'border-dark')
            })}
            isClearable={false}
            isSearchable={false}
            // theme={theme => ({
            //   ...theme,
            //   borderRadius: 0,
            //   colors: {
            //     ...theme.colors,
            //     primary25: 'hotpink',
            //     primary: 'neutral50'
            //   }
            // })}
          />
          {/* <select name="asd" id="asd">
            <option value=""></option>
          </select> */}
        </div>
      </Modal>
    </>
  )
}

export default TodoCart
