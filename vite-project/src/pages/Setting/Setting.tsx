import React from 'react'
import './Setting.scss'
import ProfileSetting from '../../Component/UI/ProfileSettingNav/ProfileSettingNav'
import SocialMedia from '../../Component/SocialMedia/SocialMedia'
import GameInformation from '../../Component/GameInformation/GameInformation'
import GeneralInformation from '../../Component/GeneralInformation/GeneralInformation'
import AvatarChange from '../../Component/AvatarChange/AvatarChange'

const Setting = () => {
return (
    <div className='setting-container'>
        <div className="setting-content">
            <div className="setting-title">Настройки</div>
            <ProfileSetting/>
            <div className="setting-items">
                <div className="setting-item-left">
                    <SocialMedia/>
                    <GeneralInformation/>
                </div>
                <div className="setting-item-right">
                    <GameInformation/>
                    <AvatarChange/>
                </div>
            </div>
            <div className="setting-item-bottom">
                <div>О себе</div>
                <textarea placeholder='Введите текст' name="" id="" ></textarea>
                <button>Сохранить изменения</button>
            </div>
        </div>
    </div>
)
}

export default Setting