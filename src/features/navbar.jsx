import React from 'react'
import { Outlet } from 'react-router-dom'
function Navbar() {
  return (
    <div>{<Outlet/>}</div>
  )
}

export default Navbar