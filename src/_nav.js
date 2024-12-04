import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilPhone
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Campaign',
    to: '/campaign',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Lead',
    to: '/lead',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />
  },
]

export default _nav
