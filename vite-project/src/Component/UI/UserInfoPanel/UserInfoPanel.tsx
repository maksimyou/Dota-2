import React from 'react'
import './UserInfoPanel.scss'
import { useAppSelector } from '../../../hooks/useTypeSelectDispstch';
import avatar from '../../../assets/avatar.png'


const UserInfoPanel = () => {
    const modals = useAppSelector((state)=>state.modals);

  return (
    <div className='user-info-panel-container'>
        <div className="user-info-panel-content">
            <div className="user-info-panel-img"><img src={modals.avatarURL.medium?modals.avatarURL.medium:avatar} alt="" /></div>
            <div className="user-info-panel-name-status">
                <div className="user-info-panel-name">{modals.username}</div>
                <div className="user-info-panel-status">{`была в сети ?? минут назад`}</div>
            </div>
        </div>
    </div>
  )
}

export default UserInfoPanel