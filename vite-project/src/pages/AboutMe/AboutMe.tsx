import React from 'react'
import './AboutMe.scss'
import HeaderAbout from '../../Component/HeaderAbout/HeaderAbout'
import AboutMedia from '../../Component/AboutMedia/AboutMedia'
import AboutFriends from '../../Component/AboutFriends/AboutFriends'
import AboutPosts from '../../Component/AboutPosts/AboutPosts'

function AboutMe() {
  return (
    <div className='about-me-container'>
        <div className="about-me-content">
          <HeaderAbout/>
          <div className="about-me-wrap-flex">
            <div className="about-me-wrap-flex-left">
              <AboutMedia/>
              <AboutPosts/>
            </div>
            <div className="about-me-wrap-flex-right">
              <AboutFriends/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AboutMe


