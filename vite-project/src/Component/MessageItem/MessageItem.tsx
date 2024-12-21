import React from 'react'
import { SERVER_URI2 } from '../../constants'
import { TextToSpeech, Positions, Sizes } from 'tts-react'
import {useAppDispatch,useAppSelector} from '../../hooks/useTypeSelectDispstch'
import { ObjMessage } from '../../redux/socket/types'
import { UserData } from '../types/type'
import './MessageItem.scss'
import { CgTrashEmpty } from 'react-icons/cg'
import TimeAgo from 'react-timeago'
import avatar from '../../assets/avatar.png'

interface MessageItemProps{
    message:ObjMessage,
    removeMessage:(message:ObjMessage) => void,
    roomId:string
} 


const MessageItem = ({ message, removeMessage,roomId }:MessageItemProps) => {
console.log(roomId);

const user:UserData = useAppSelector((state)=>state.user.user)
const usersId = useAppSelector((state)=>state.socket.rooms.usersId)
    
    //const user2:UserItem = JSON.parse(localStorage.getItem('idUser') as string)
// элемент для рендеринга зависит от типа сообщения
let element

// извлекаем из сообщения тип и текст или путь к файлу
const { messageType, textOrPathToFile } = message

// формируем абсолютный путь к файлу
const pathToFile = `${SERVER_URI2}/files${textOrPathToFile}`

// определяем элемент для рендеринга на основе типа сообщения
switch (messageType) {
  case 'text':
    element = (
      
          <TextToSpeech
          markTextAsSpoken
          align="horizontal"
          size={Sizes.SMALL}
          position={Positions.TL}>
          <p>{textOrPathToFile}</p>
          </TextToSpeech>
    )
    break
  case 'image':
    element = <img src={pathToFile} alt='' />
    break
  case 'audio':
    element = <audio src={pathToFile} controls></audio>
    break
  case 'video':
    element = <video src={pathToFile} controls></video>
    break
  default:
    return null
}

// определяем принадлежность сообщения текущему пользователю
const isMyMessage:boolean = (user.id).toString() === (message.userId).toString()

return (
  <li className={`${isMyMessage ? 'my' : 'message2'}`}>
      {/*<img src={usersId[roomId].filter(d=>d.id !== user.id)[0].avatarURL.medium} alt="" />*/}
        <img src={usersId[roomId].filter(d=>d.id !== user.id)[0].avatarURL.medium?usersId[roomId].filter(d=>d.id !== user.id)[0].avatarURL.medium:avatar} alt="" />
        <div className={`item`}>
          <p className='username'>{isMyMessage ? 'Me' : message.userName}</p>
          <div className='inner'>
              {element}
              {/* пользователь может удалять только свои сообщения */}
          </div>
          <div className={`message-item-btn-delete ${isMyMessage ? '' : 'message-item-btn-delete-no-my'}`}>
            {isMyMessage &&
            <button className='message-item-btn' onClick={() => removeMessage(message)}>
                <CgTrashEmpty className='icon remove' />
            </button>
            }
            <p className='datetime'>
                <TimeAgo date={message.createdAt as string | (Date & string)} />
            </p>
          </div>
        </div>
    </li>   
)
}

export default MessageItem


