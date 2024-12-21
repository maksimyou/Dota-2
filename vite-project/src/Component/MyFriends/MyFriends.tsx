import React from 'react'
import './MyFriends.scss'
import { MdSearch, } from 'react-icons/md'
import { useAppSelector } from '../../hooks/useTypeSelectDispstch';
import MyFriendsItem from '../MyFriendsItem/MyFriendsItem';

const MyFriends = () => {

const friends = useAppSelector((state)=>state.user.friends);

  return (
    <div className='my-friends-container'>
        <div className="my-friends-content">
            <div className="my-friends-left">
            <div className="my-friends-left-title">Мои друзей</div>
                <div className="my-friends-block">
                    <input type="text" placeholder='Введите запрос'/>
                    <button className='my-friends-btn'><MdSearch/></button>
                </div>
                <div className="my-friends-block2">
                    <div className="my-friends-result">
                        {friends.map(e=>
                        <MyFriendsItem key={e.id} avatarURL={JSON.parse(e.avatarURL as unknown as string)} username={e.username} id={e.id}/>
                           )}
                    </div>
                </div>
            </div>
            <div className="my-friends-rigth">
            <div className="my-friends-rigth-title">Возможные друзья</div>
                <form action=""></form>
            </div>
        </div>
    </div>
  )
}

export default MyFriends