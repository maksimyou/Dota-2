import React from 'react'
import './SocialMedia.scss'
import steam from '../../assets/steam-accaunt.png'
import vk from '../../assets/vk-accaunt.png'
import eye from '../../assets/eye.png'

const SocialMedia = () => {
  return (
    <div className='social-media-container'>
        <div className="social-media-content">
            <div className="social-media-title">Социальные сети</div>
            <div className="social-media-grid">
                <div className="social-media-grid-item">
                    <div className="social-media-subtitle">Название</div>
                    <div  className="social-media-box-icon"><img title="Отображать социальную сеть остальным?" src={eye} alt="" /></div>
                </div>
                <div className="social-media-grid-item">
                    <div className="social-media-link"><img src={steam} alt="" />Привязать аккаунт</div>
                    <div className="social-media-box-icon"><input type="checkbox" name="" id="" /></div>
                </div>
                <div className="social-media-grid-item">
                    <div className="social-media-link"><img src={vk} alt="" />Привязать аккаунт</div>
                    <div className="social-media-box-icon"><input type="checkbox" name="" id="" /></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SocialMedia

