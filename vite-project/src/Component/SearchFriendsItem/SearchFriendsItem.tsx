import React,{FC} from 'react'
import './SearchFriendsItem.scss'
import avatar from '../../assets/avatar.png'
import { fetchAddFriends } from '../../redux/user/actions'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelectDispstch'
import { Link } from 'react-router-dom'
import { setShowNewMessage } from '../../redux/modals/actions'

interface SearchFriendsItemProps{
    avatarURL:Avatar,
    username:string,
    id:number
}

interface Avatar {
    small:string,
    medium:string,
    large:string
}


const SearchFriendsItem:FC<SearchFriendsItemProps> = ({avatarURL,username,id}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state)=>state.user.user);
    const friends = useAppSelector((state)=>state.user.friends);


  return (
    <div className='search-friends-item'>
        <img src={avatarURL.medium||avatar} alt="" />
        <div className="search-friends-username-message">
            <Link to={username} className="search-friends-username">{username}</Link>
            <div onClick={()=>dispatch(setShowNewMessage({show:true, avatarURL:avatarURL, username:username, id:id}))} className="search-friends-message">Написать сообщение</div>
        </div>
        <div className="search-friends-add">
            {(user.id!==id&&!friends.some(e=>e.id === id))&&<button onClick={()=>dispatch(fetchAddFriends({idUser:id}))}>Добавить в друзья</button>}
        </div>
</div>
  )
}

export default SearchFriendsItem