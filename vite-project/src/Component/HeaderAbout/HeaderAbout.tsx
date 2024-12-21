import React from 'react'
import './HeaderAbout.scss'
import Profile from '../Profile/Profile'
import pencil from '../../assets/penapple-black.png'

const HeaderAbout = () => {
  return (
    <div className='header-about-container'>
        <div className="header-about-content">
            <div className="header-about-top">
                <button className="header-about-top-change"><img src={pencil} alt="" />Изменить обложку</button>
            </div>
            <div className="header-about-bottom">
            <Profile/>
            </div>
        </div>
    </div>
  )
}

export default HeaderAbout