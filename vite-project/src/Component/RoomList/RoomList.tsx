import React, { useEffect } from 'react'
import './RoomList.scss'
interface RoomListProps {
    setRoom:any,
    room:any
}
import { useAppDispatch,useAppSelector } from '../../hooks/useTypeSelectDispstch.ts'
import avatar from '../../assets/avatar.png'

import { setDevSocket } from '../../redux/socket/actions.ts'

const RoomList = ({setRoom,room}) => {
    const usersId = useAppSelector((state)=>state.socket.rooms.usersId)
    const user = useAppSelector((state)=>state.user.user)
   
  return (
    <ul className='room-list-container'>
        <div className="room-list-content">
            {
                Object.entries(usersId).map((e,i)=>{
                    console.log(e);
                    return <li className={room===e[0]?'room-list-item room-list-item-active':'room-list-item'} key={i} onClick={()=>{setRoom(e[0])}}>
                        <img src={e[1].filter(d=>d.id !== user.id)[0].avatarURL.medium?e[1].filter(d=>d.id !== user.id)[0].avatarURL.medium:avatar} alt="" /><span>{e[1].filter(d=>d.id !== user.id)[0].username}</span>
                    </li>
                })
            }
        </div>
    </ul>
  )
}

export default RoomList