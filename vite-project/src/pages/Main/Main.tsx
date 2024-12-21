import {FC} from 'react'
import './Main.scss'
import {} from 'react-icons'
import {Heroes} from '../../Component/types/type'
import { Link, Outlet } from 'react-router-dom'
import {  } from 'react-icons/fa'
interface PropsMain{
    heroes:Heroes[]
  }
//import string from  '../../assets/Level dot.png'
//import agility from  '../../assets/Level dot2.png'
//import Intelligence from  '../../assets/Level dot3.png'
import myPage from '../../assets/my-page.png'
import message from '../../assets/message.png'
import friends from '../../assets/friends.png'
import community from '../../assets/community.png'
import picture from '../../assets/picture.png'

const Main:FC = () => {
  return (
    <div className='main_container'>
    <div className="main_content">
        <div className="main-sidbar-nav">
            <ul>
                <li className='main-sidbar-link'><img src={myPage} alt="" /><Link className='main-sidbar-link-link' to='about-me'>Моя страница</Link></li>
                <li className='main-sidbar-link'><img src={message} alt="" /><Link className='main-sidbar-link-link' to='messages'>Мессенджер</Link></li>
                <li className='main-sidbar-link'><img src={friends} alt="" /><Link className='main-sidbar-link-link' to='friends'>Друзья</Link></li>
                <li className='main-sidbar-link'><img src={community} alt="" /><Link className='main-sidbar-link-link' to=''>Сообщества</Link></li>
                <li className='main-sidbar-link'><img src={picture} alt="" /><Link className='main-sidbar-link-link' to=''>Фотографии</Link></li>
            </ul>
        </div>
        
        <div className="main-content-outlet">
            <Outlet/>
        </div>
    </div>
    </div>
  )
}
export default  Main;





    {/*<div className="main_container_group_one">
            <div className="main_group_title"><img src={string} alt="" />STRENGTH</div>   
            <div className="main_group_one_table table">
                {heroes.filter(e=>{return e.primary_attr==='str'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_second">
            <div className="main_group_title"><img src={agility} alt="" />AGILITY</div>   
            <div className="main_group_second_table table">
                {heroes.filter(e=>{return e.primary_attr==='agi'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_third">
            <div className="main_group_title"><img src={Intelligence} alt="" />Intelligence</div>   
            <div className="main_group_third_table table">
                {heroes.filter(e=>{return e.primary_attr==='int'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_four">
            <div className="main_group_title"><img src={string} alt="" /><img src={agility} alt="" /><img src={Intelligence} alt="" />Universal</div>   
            <div className="main_group_four_table table">
                {heroes.filter(e=>{return e.primary_attr==='all'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>*/}