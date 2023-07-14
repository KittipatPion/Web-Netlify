import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Timmers from '../helpers/Timers'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CCard
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
} from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (

    <CHeader className="headtext-bold" withSubheader>

      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="smpheader" width="100%" alt="Logo" />

      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">

        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        {/* <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>
      {/* <CCard className="px-3"> */}
      
      {/* </CCard> */}


      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          {/* <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink> */}
          {/* <CLink className="c-subheader-nav-link" href="#">
            <TheHeaderDropdownTasks />
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <TheHeaderDropdownNotif />
          </CLink> */}
          {/* <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <TheHeaderDropdownNotif/>
          </CLink> */}
          {/* <CLink className="c-subheader-nav-link" href="#">
            <TheHeaderDropdownMssg />
          </CLink> */}
        </div>
      </CSubheader>
    </CHeader>

  )
}

export default TheHeader
