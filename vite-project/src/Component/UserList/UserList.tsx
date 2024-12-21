import React from 'react'
import './UserList.scss'

interface UserListProps{
    users:UserItem[]
}

interface UserItem{
    userId: number,
    userName: string
}

const UserList = ({ users }:UserListProps) => {

    
  return (
    <div className='user-list-container'>
        <div className="user-list-content">
            <ul className='user-list-content-users'>
            {users.map(({ userId, userName }) => (
                <li key={userId} className='user-list-content-item'>
                    {/*<AiOutlineUser className='icon user' /> Иконака*/}
                    {userName}
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}

export default UserList