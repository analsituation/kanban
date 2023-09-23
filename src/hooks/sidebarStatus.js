import { useDispatch, useSelector } from 'react-redux'
import { changeSidebar } from '../store/sidebarSlice'

export const useSidebarStatus = () => {
  const currentSidebarStatus = useSelector(state => state.sidebar)
  const dispatch = useDispatch()

  const changeSidebarStatus = () => {
    dispatch(changeSidebar(!currentSidebarStatus))
  }

  return [currentSidebarStatus, changeSidebarStatus]
}
