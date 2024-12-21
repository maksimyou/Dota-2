import React,{FC} from 'react'
import './MyFriendsItem.scss'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import { setShowNewMessage } from '../../redux/modals/actions'
import { useAppDispatch } from '../../hooks/useTypeSelectDispstch'

interface MyFriendsItemProps{
    avatarURL:Avatar,
    username:string,
    id:number
}

interface Avatar {
    small:string,
    medium:string,
    large:string
}
const MyFriendsItem:FC<MyFriendsItemProps> = ({avatarURL,username,id}) => {
const dispatch = useAppDispatch()

  return (
<div className='my-friends-item'>
        <img src={avatarURL.medium||avatar} alt="" />
        <div className="my-friends-username-message">
            <Link to={username} className="my-friends-username">{username}</Link>
            <div onClick={()=>dispatch(setShowNewMessage({show:true, avatarURL:avatarURL, username:username, id:id}))} className="my-friends-message">Написать сообщение</div>
        </div>
        <div className="my-friends-remove">
            <button onClick={()=>{}}>Удалить из друзей</button>
        </div>
</div>
  )
}

export default MyFriendsItem