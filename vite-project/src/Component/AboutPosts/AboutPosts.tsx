import React from 'react'
import './AboutPosts.scss'
import empty from '../../assets/empty.png'
const AboutPosts = () => {
  return (
    <div className='about-posts-container'>
        <div className="about-posts-content">
            <div className="about-posts-title">Все записи</div>
            {true?<div className="about-posts-empty">
                <img src={empty} alt="" />
                <div className="">На стене пока нет ни одной записи</div>
            </div>:
            <div className="about-posts-items">
                <div className="about-posts-item"></div>
            </div>}
        </div>
    </div>
  )
}

export default AboutPosts