import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex-1 flex flex-col max-h-screen'>
      <h1>TESTE LAYOUT</h1>
      <Outlet />
    </div>
  )
}

export default Layout