import React from 'react'
import './AvatarChange.scss'
import avatar from '../../assets/avatar.png'
const AvatarChange = () => {
  return (
    <div className='avatar-change-container'>
        <div className="avatar-change-content">
            <div className="avatar-change-title">Смена аватара</div>
            <img src={avatar} alt="" />
            <div className="avatar-change-text">Форматы: <span>PNG, JPG</span></div>
            <div className="avatar-change-text">Размер до <span>10 Мбайт</span></div>
            <div className="avatar-change-btn">
                <button>Сменить аватар</button>
                <button>Удалить аватар</button>    
            </div>
        </div>
    </div>
  )
}

export default AvatarChange