import React,{FC} from 'react'

import './NavbarFriends.scss'
import { NavLink } from 'react-router-dom'

interface NavbarFriendsProps {
    showLink:boolean
}

const NavbarFriends:FC<NavbarFriendsProps> = ({showLink}) => {
  return (
    <div className='navbar-friends-container'>
        <div className="navbar-friends-content">
            <ul className='navbar-friends-lists'>
                {!showLink&&<li className='navbar-friends-link'><NavLink className='navbar-friends-link-nav' to='my-friends'>Мои друзья</NavLink></li>}
                <li className='navbar-friends-link'><NavLink className='navbar-friends-link-nav' to='search-friends'>Поиск друзей</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default NavbarFriends