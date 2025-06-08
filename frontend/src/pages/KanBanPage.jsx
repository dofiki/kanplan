import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import KanBan from '../components/KanBan'
import './KanBanPage.css' // Assuming you have a CSS file for styling

function KanBanPage() {
  return (
    <div>
      <NavBar />
      <div className='main-container'>
        <SideBar />
        <KanBan />
        </div>
    </div>
  )
}

export default KanBanPage
