import React,{FC} from 'react'
import './NewMessage.scss'
import { MdClose } from 'react-icons/md'
import MessageInput from '../../MessageInput/MessageInput'
import { useAppDispatch } from '../../../hooks/useTypeSelectDispstch'
import { setShowNewMessage } from '../../../redux/modals/actions'
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel'

const NewMessage:FC = () => {
    const dispatch = useAppDispatch()
    

    return (
    <div className='new-message-container'>
        <div className="new-message-content">
            <div onClick={()=>dispatch(setShowNewMessage({show:false, avatarURL:'', username:'', id:0}))} className="new-message-close"><MdClose/></div>
            <div className="new-message-header">
                <div className="new-message-title">Новое сообщение</div>
            </div>
            <div className="new-message-main">
                <div className="new-message-user-info">
                    <UserInfoPanel/>
                </div>
            </div>
            <div className="new-message-form">
                    <MessageInput sendMessage={()=>{}} roomId={''} newMessageCss={false}/>
            </div>
        </div>
    </div>
  )
}

export default NewMessage