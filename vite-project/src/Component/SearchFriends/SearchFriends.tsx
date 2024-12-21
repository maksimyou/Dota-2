import React,{useEffect, useState} from 'react'
import './SearchFriends.scss'
import { MdSearch, } from 'react-icons/md'
import { useAppDispatch,useAppSelector } from '../../hooks/useTypeSelectDispstch.ts'
import {  fetchGetUsers } from '../../redux/user/actions'

import { Link } from 'react-router-dom'
import SearchFriendsItem from '../SearchFriendsItem/SearchFriendsItem.tsx'


const SearchFriends = () => {
const dispatch = useAppDispatch()
const users = useAppSelector((state)=>state.user.users);

console.log(users);

useEffect(()=>{
    dispatch(fetchGetUsers())
},[])


  return (
    <div className='search-friends-container'>
        <div className="search-friends-content">
            <div className="search-friends-left">
            <div className="search-friends-left-title">Поиск друзей</div>
                <div className="search-friends-block">
                    <input type="text" placeholder='Введите запрос'/>
                    <button className='search-friends-btn'><MdSearch/></button>
                </div>
                <div className="search-friends-block2">
                    <div className="search-friends-result">
                        {users.map(e=>
                        <SearchFriendsItem key={e.id} avatarURL={JSON.parse(e.avatarURL as unknown as string)} username={e.username} id={e.id}/>
                           )}
                    </div>
                </div>
            </div>
            <div className="search-friends-rigth">
                <div className="search-friends-rigth-title">Фильтр поиска</div>
                <form action=""></form>
            </div>
        </div>
    </div>
  )
}

export default SearchFriends