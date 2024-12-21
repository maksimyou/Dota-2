import React from 'react'
import './AboutFriends.scss'
const AboutFriends = () => {
  return (
    <div className='about-friends-container'>
        <div className="about-friends-content">
            <div className="about-friends-title">Друзья</div>
            <div className="about-friends-wrap">
                <div className="">У вас пока нет друзей</div>
                <button >Добавить друзей</button>
            </div>
        </div>
    </div>
  )
}

export default AboutFriends