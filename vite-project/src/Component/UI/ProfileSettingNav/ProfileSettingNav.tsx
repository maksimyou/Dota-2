import * as React from 'react';
import './ProfileSettingNav.scss'

const ProfileSetting =()=> {
  return (
    <div className="profile-setting-container">
        <div className="profile-setting-content">
            <button className='profile-setting-btn'>Общий</button>
            <button className='profile-setting-btn'>Активность</button>
            <button className='profile-setting-btn'>Безопасность</button>
            <button className='profile-setting-btn'>Уведомления</button>
            <button className='profile-setting-btn'>Игнорлист</button>
        </div>
    </div>


  );
}

export default ProfileSetting
