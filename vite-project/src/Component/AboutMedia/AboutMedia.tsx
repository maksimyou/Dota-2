import React,{useState} from 'react'
import './AboutMedia.scss'


const AboutMedia = () => {
    const [currentTab,setCurrentTab] = useState(1)

    
    return (
    <div className='about-media-container'>
        <div className="about-media-content">
            <div className="about-media-navigation">
                <div>
                    <button className={currentTab===1?'about-media-nav-active':''} onClick={()=>{setCurrentTab(1)}}>Фото</button>
                    <button className={currentTab===2?'about-media-nav-active':''} onClick={()=>{setCurrentTab(2)}}>Музыка</button>
                    <button className={currentTab===3?'about-media-nav-active':''} onClick={()=>{setCurrentTab(3)}}>Статьи</button>
                    <button className={currentTab===4?'about-media-nav-active':''} onClick={()=>{setCurrentTab(4)}}>Альбомы</button>
                </div>
            </div>
            <div className="about-media-items">
                {currentTab===1&&<div className="about-media-item">
                    <div className="">Вы еще не добавлили фото</div>
                    <button>Загрузить фото</button>
                </div>}
                {currentTab===2&&<div className="about-media-item">
                    <div className="">Вы еще не добавлили музыку</div>
                    <button>Найти музыку</button>
                </div>}
                {currentTab===3&&<div className="about-media-item">
                    <div className="">Вы еще не добавлили статью</div>
                    <button>Загрузить статью</button>
                </div>}
                {currentTab===4&&<div className="about-media-item">
                    <div className="">Вы еще не создали альбом</div>
                    <button>Создать альбом</button>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default AboutMedia