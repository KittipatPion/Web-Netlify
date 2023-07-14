import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'




import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import { colors } from '@material-ui/core'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      className="Element-nav"
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >

      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <h3  className="c-sidebar-brand-full" >SMART PAYMENT</h3> */}
        <CIcon
          className="c-sidebar-brand-full"
          name="smp6"
          width="100%"
        />

        {/* <img src='../assets/icons/SMP-logo.png' alt="Logo" />; */}
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
        {/* <h3 className="c-sidebar-brand-minimized">SMP</h3> */}
      </CSidebarBrand >

      <CSidebarNav onClick={() => localStorage.removeItem("searchData")}  >
        <h6>
          <CCreateElement
          // style={{ overflow: "hidden" }}
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
               CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </h6>

      </CSidebarNav>


      {/* <CSidebarMinimizer className="c-d-md-down-none " /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
