import React, { useEffect, useState } from 'react'
import './Messages.scss'
//import MessageList from '../../Component/MessageList/MessageList.tsx'
//import UserList from '../../Component/UserList/UserList.tsx'
//import MessageInput from '../../Component/MessageInput/MessageInput.tsx'
import { useAppDispatch,useAppSelector } from '../../hooks/useTypeSelectDispstch.ts'

//import { fetchGetDataUser } from '../../redux/user/actions.ts'
//import { ObjMessage } from '../../redux/socket/types.ts'
import MessageRoom from '../../Component/MessageRoom/MessageRoom.tsx'
import RoomList from '../../Component/RoomList/RoomList.tsx'
import { setDevSocket } from '../../redux/socket/actions.ts'

//interface UserItem{
//    userId: number,
//    userName: string
//  }

//interface MessagesProps {
//    users,
//    messages,
//    log,
//    sendMessage,
//    removeMessage
//}

const Messages = () => {

const [room , setRoom] = useState<string>('')

//fetchCreateUserRoom


  return (
    <div className='messages-container'>
        <div className="messages-content">
            <div className="messages-list-chats">
                <div className="messages-list-chats-setting-search">
                    <input type="text" />
                </div>
                <RoomList room={room} setRoom={setRoom}/>
            </div>
            <div className="messages-list-messages">
                <div className="messages-list-messages-empty">
                    {room
                    ?
                    <MessageRoom roomId={room}/>
                    :
                    <div className="choose-chat">Выберите чат или создайте новый</div>}
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Messages