import {FC} from 'react'
import './Profile.css'
import arrow_bottom from '../../assets/arrow.png'
interface Profile{
    user_img:string,
    username:string,
}
const Profile:FC<Profile> = ({user_img,username}) => {
  return (
    <div className='profile_container'>
        <img className='profile_userimg' src={user_img} alt="" />
        <div className="">
            <div className="profile_username">{username}</div>
            <div className="profile_status">Online <img src={arrow_bottom} alt="" /></div>
        </div>
    </div>
  )
}
export default  Profile;
