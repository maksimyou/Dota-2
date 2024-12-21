import React, { FC } from 'react'
import './MessageList.scss'
import MessageItem from '../MessageItem/MessageItem'
import { ObjMessage } from '../../redux/socket/types'
import message from '../../assets/message2.png'

interface MessageListProps{
    log:string,
    messages:ObjMessage[],
    removeMessage:(message:ObjMessage)=>void,
    roomId:string
} 


const MessageList = ({log,messages,removeMessage,roomId}:MessageListProps) => {
    

    return (
    <div className='message-list-container'>
        <div className="message-list-content">
            {messages.length===0&&<img src={message} alt="" />}
            <ul className='message-list-list'>
                {/* перебираем список и рендерим сообщения */}
                {messages.map((message) => (
                    <MessageItem
                        roomId={roomId}
                        key={message.id}
                        message={message}
                        removeMessage={removeMessage}
                    />
                ))}
            </ul>
        </div>
    </div>
  )
}

export default MessageList