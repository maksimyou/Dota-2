import React, { FC, useEffect } from 'react'
import './MessageRoom.scss'
import MessageList from '../MessageList/MessageList'
import MessageInput from '../MessageInput/MessageInput'
import userChat from '../../hooks/userChat.ts'

interface MessageRoomProps {
    roomId:string
} 

const MessageRoom:FC<MessageRoomProps> = ({roomId}) => {
    console.log(roomId);

    const { users, messages, log, sendMessage, removeMessage} = userChat(roomId)

    
  return (
    <>
     {/*<UserList users={users} />*/}
    <MessageList
        roomId={roomId}
        log={log}
        messages={messages}
        removeMessage={removeMessage}
    />
    <MessageInput roomId={roomId} sendMessage={sendMessage} />
    </>
  )
}

export default MessageRoom