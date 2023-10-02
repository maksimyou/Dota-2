import  { useState, FC } from 'react'
import './Header.css'
import Profile from '../Profile/Profile'
import Logo from '../../assets/Vector.png'
import shop from '../../assets/Group.png'
import notification from '../../assets/Notifications.png'
import setting from '../../assets/Settings.png'
import enter from '../../assets/Settings_enter.png'

import {Playres} from '../types/type.ts'
interface Ppp{
  players:Playres
}
const Header:FC<Ppp> = ({players})=> {
    const  [menu, setMenu] = useState<string[]>(['Home','Heroes', 'Store','Watch', 'Learn', 'Random']);
    setMenu;
  return (
    <div className='header_container'>
        <div className="header_nav_list">
          <div className="logo_header_img">
              <img src={Logo} alt="" />
          </div>
          <ul>{menu.map(elem=>{return <li className='list_header_link'>{elem}</li>})}</ul>
          </div>
        <div className="header_user-panel">
          <div className="header_shop">
            <img src={shop} alt="" />
            <div className="header_money">800</div>
          </div>
          <img className ='header_notification' src={notification} alt="" />
          <img className="header_setting" src={setting} alt="" />
          <div className="line_vertical"></div>
          <div className=""></div>
          <Profile user_img ={players.profile.avatarmedium} username={players.profile.personaname}/>
          <img className='header_enter' src={enter} alt="" />
          </div>
    </div>
  )
}
export default Header;
