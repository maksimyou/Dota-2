import { SERVER_URI } from '../constants'
import {  useEffect, useRef, useState } from 'react'
import {useAppDispatch,useAppSelector} from './useTypeSelectDispstch'
import { io } from 'socket.io-client'
import { UserData } from '../redux/user/types'
import {setLog,setUsers,setMessages, setDevSocket} from '../redux/socket/actions'
import { ObjMessage } from '../redux/socket/types'

interface useChatProps {
  users:UserItem[],
  messages:ObjMessage[],
  log:string,
  sendMessage:(message:ObjMessage)=>void,
  removeMessage:(message:ObjMessage)=>void,
}



interface UserItem{
  userId: number,
  userName: string
}


const useChat = (roomId:string):useChatProps=> {
  const dispatch = useAppDispatch()
  console.log('ЫЫЫЫЫЫЫЫЫЫЫЫЫ222222',roomId);

    // извлекаем данные пользователя из локального хранилища
  const user:UserData = useAppSelector((state)=>state.user.user)
  const user2:UserItem = JSON.parse(localStorage.getItem('idUser') as string)
  // локальное состояние для списка пользователей
  const users:UserItem[] = useAppSelector((state)=>state.socket.users)
  // локальное состояние для списка сообщений
  const messages:ObjMessage[] = useAppSelector((state)=>state.socket.messages)
  // состояние для системного сообщения
  const log:string = useAppSelector((state)=>state.socket.log)
  const devSocket:boolean = useAppSelector((state)=>state.socket.devSocket)

  
  console.log(devSocket);
  // иммутабельное состояние для сокета
  
  const { current: socket } = useRef(
    io(SERVER_URI, {
      query: {
        // отправляем идентификатор комнаты и имя пользователя на сервер
        //roomId: user.id,
        roomId: roomId,
        userName: user.username,
      }
    })
  )

  // регистрируем обработчики
  useEffect(() => {
    console.log('ЫЫЫЫЫЫЫЫЫЫЫЫЫ',roomId);
  
    // сообщаем о подключении нового пользователя
    
    //socket.emit('user:add', {roomId: user2.userId, userName: user2.userName})

    // запрашиваем сообщения из БД
    socket.emit('message:get',{roomId})
    
    // обрабатываем получение системного сообщения
    //socket.on('log', (log) => {

    //  dispatch(setLog(log))
    //})

    // обрабатываем получение обновленного списка пользователей
    //socket.on('user_list:update', (users) => {
    //  dispatch(setUsers(users))
    //})

    // обрабатываем получение обновленного списка сообщений
    socket.on('message_list:update', (messages) => {
      dispatch(setMessages(messages))
    })
    dispatch(setDevSocket(false))

  }, [roomId,devSocket])

  // метод для отправки сообщения
  const sendMessage = (message:ObjMessage):void => {
    console.log('MEEEEEEEEEEEESSSSSSSSSSSSSSAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGEEEEEEEEEEEEEEEEEE',message);
    socket.emit('message:add', message)
  }

  // метод для удаления сообщения
  const removeMessage = (message:ObjMessage):void => {
    socket.emit('message:remove', message)
    dispatch(setDevSocket(true))
  }

  return { users, messages, log, sendMessage, removeMessage }
}


export default useChat;
