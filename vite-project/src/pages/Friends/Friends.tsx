import React,{useEffect, useState} from 'react'
import './Friends.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarFriends from '../../Component/UI/NavbarFriends/NavbarFriends'
import { useAppSelector } from '../../hooks/useTypeSelectDispstch'
import NewMessage from '../../Component/UI/NewMessage/NewMessage'

const Friends = () => {
  const friends = useAppSelector((state)=>state.user.friends);
  const {showNewMessage} = useAppSelector((state)=>state.modals);

  const navigate = useNavigate();


useEffect(()=>{
  if(friends.length===0&&location.href === 'http://localhost:5173/friends'){
    navigate("/friends/search-friends"); 
  }else{
    navigate("/friends/my-friends"); 

  }
},[])

  return (
    <div className='friends-container'>
      {showNewMessage&&<NewMessage/>}
      <div className="friends-content">
        <NavbarFriends showLink={friends.length===0}/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Friends


