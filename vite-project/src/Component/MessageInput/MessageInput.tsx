import { useEffect, useRef, useState, FC,FormEvent,LegacyRef, RefObject, useLayoutEffect} from 'react'
import {useAppDispatch,useAppSelector} from '../../hooks/useTypeSelectDispstch'
import {setFile,setShowEmoji,setShowPreview,clearFile} from '../../redux/message/actions'
import {fetchUpload} from '../../redux/message/actions'
import { ObjMessage, RoomMessageChat } from '../../redux/socket/types';
import EmojiMart from '../UI/EmojiMart/EmojiMart';
import FileInput from '../UI/FileInput/FileInput';
import Recorder from '../UI/Recorder/Recorder';
import { FiSend } from 'react-icons/fi';
import './MessageInput.scss'
import { MessageState } from '../../redux/message/types';
import axios from 'axios';
import { fetchCreateUserRoom } from '../../redux/socket/actions';
//interface MessageInput{
//    userId:number;
//    userName:string;
//    roomId:number;
//    messageType?:string|undefined;
//    textOrPathToFile?:string
//}

interface MessageInputProps{
    sendMessage:(message:ObjMessage)=>void,
    roomId:string,
    newMessageCss?:boolean
}

const MessageInput:FC<MessageInputProps> = ({sendMessage,roomId,newMessageCss = true}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state)=>state.user.user);
    const socket = useAppSelector((state)=>state.socket);
    const modals = useAppSelector((state)=>state.modals);

    const {showNewMessage} = useAppSelector((state)=>state.modals);
   
    const message = useAppSelector((state)=>state.message);
    //const [message,setMessage] = useState<MessageState>(useAppSelector((state)=>state.message)) 
    // локальное состояние для текста сообщения
    const [text, setText] = useState<string>('')
  // локальное состояние блокировки кнопки
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
    // извлекаем данные пользователя и формируем начальное сообщение
  //  const [messageNew,setMessageNew] = useState<ObjMessage>( {
  //    userId:user.id,
  //    userName:user.username,
  //    //roomId:user.id
  //    roomId:'main_room'
  //})
  

const [devSubmit,setDevSubmit] = useState(false);
  // иммутабельная ссылка на инпут для ввода текста сообщения
    const inputRef = useRef() as LegacyRef<HTMLInputElement>|undefined

// функция для отправки сообщения
const onSubmit = async (path:string) => {
  console.log(10);
  console.log(message);
    //e:FormEvent<HTMLFormElement>
    //e.preventDefault()
    if (submitDisabled) return

    // извлекаем данные пользователя и формируем начальное сообщение
    const messageNew:ObjMessage = {
        userId:user.id,
        userName:user.username,
        //roomId:user.id
        roomId:roomId
    }
    
    //setMessageNew({...messageNew,userId: user.id,userName: user.username})
    //setMessageNew({...messageNew,userName: user.username})
    messageNew.userId = user.id
    messageNew.userName = user.username


    
    if (!message.file) {
      // типом сообщения является текст
      //setMessageNew({...messageNew,messageType: 'text',textOrPathToFile: text})
      //setMessageNew({...messageNew,textOrPathToFile: text})
      messageNew.messageType = 'text'
      messageNew.textOrPathToFile = text
    } else {
      // типом сообщения является файл
      try {
        
        // загружаем файл на сервер и получаем относительный путь к нему
        //await dispatch(fetchUpload({ file:message.file, roomId:'main_room'}))

        // получаем тип файла
        const type:string = message.file.type.split('/')[0]
        //const pathAsync = async () => {
        //  //setMessageNew({...messageNew,messageType: type,textOrPathToFile: message.path})
        //  //setMessageNew({...messageNew,textOrPathToFile: message.path})
          messageNew.messageType = type
          messageNew.textOrPathToFile =  path
        //} 
        //await pathAsync()
      } catch (e) {
        console.error(e)
      }
    }

    // скрываем компонент с эмодзи, если он открыт
    if (message.showEmoji) {
      dispatch(setShowEmoji(false))
    }
    console.log(messageNew);
  if(modals.showNewMessage){
    dispatch(fetchCreateUserRoom({message:messageNew, toUserId:modals.id}))
  }else{
    // отправляем сообщение
    sendMessage(messageNew)
  }

    // сбрасываем состояние
    setText('')
    dispatch(clearFile())
    
  }

useEffect(() => {
  setSubmitDisabled(!text.trim() && !message.file)
}, [text, message.file])
console.log(message);

const sumbitAsync = async () => {
  let path:string = ''
  if (message.file) {
    // загружаем файл на сервер и получаем относительный путь к нему
    //await dispatch(fetchUpload({ file:message.file, roomId:'main_room'}))
    try {
      const body = new FormData()
      console.log(message.file);
      body.append('file', message.file);
      console.log(body);
  
      const response = await axios.post('http://localhost:5000/api/socket/upload', body, {
          headers:{
              'x-room-id': roomId,
              'Content-Type': 'multipart/form-data'
          }
      });
      path = response.data;
      await onSubmit(path)
    } catch (error) {
        console.log(error)
    }
  }else{
    await onSubmit(path)
  }
}

useEffect(()=>{
  if(devSubmit){
    sumbitAsync()
    setDevSubmit(false);
  }
},[devSubmit])




  return (
    <div className={newMessageCss?'message-input-container':'message-input-container-new-maesasge'}>
        <div className="message-input-content">
            <form onSubmit={e=>{e.preventDefault();setDevSubmit(true)}} className='form message'>
                {showNewMessage&&<div className="form-items-new-message">
                  <textarea
                    type='text'
                    autoFocus
                    placeholder='Введите сообщение'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                    // при наличии файла вводить текст нельзя
                    disabled={message.showPreview}
                />
                </div>}
                <div className="form-items">
                  <EmojiMart setText={setText} messageInput={(inputRef as RefObject<HTMLInputElement>).current} />
                  <FileInput />
                  <Recorder />
                  {!showNewMessage&&<input
                      type='text'
                      autoFocus
                      placeholder='Введите сообщение'
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      ref={inputRef}
                      // при наличии файла вводить текст нельзя
                      disabled={message.showPreview}
                  />}
                  {showNewMessage&&<div className="empty-block"></div>}
                  <button className='message-input-btn' type='submit' disabled={submitDisabled}>
                      {showNewMessage?<button>Отправить</button>:<FiSend className='message-input-icon' />}
                  </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default MessageInput