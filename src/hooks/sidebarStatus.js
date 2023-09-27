import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSidebar } from '../store/sidebarSlice'

export const useSidebarStatus = () => {
  const currentSidebarStatus = useSelector(state => state.sidebar)
  const dispatch = useDispatch()

  const changeSidebarStatus = status => dispatch(changeSidebar(status))
  // useCallback(() => {
  //   dispatch(changeSidebar(status))
  // }, [])

  useLayoutEffect(() => {
    if (window.innerWidth < 512) {
      dispatch(changeSidebar(true))
    } else {
      dispatch(changeSidebar(false))
    }
  }, [window.innerWidth])

  return [currentSidebarStatus, changeSidebarStatus]
}
