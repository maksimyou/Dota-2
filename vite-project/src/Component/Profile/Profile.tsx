import {FC} from 'react'
import './Profile.scss'
import arrow_bottom from '../../assets/arrow.png'
import {useAppDispatch,useAppSelector} from '../../hooks/useTypeSelectDispstch'
//import { DataLogin } from '../../types/type'
import pencil from '../../assets/penapple-black.png'
import avatar from '../../assets/no-avatar.png'

interface ProfileProps{
  
}
const Profile:FC<ProfileProps> = () => {
  const user = useAppSelector((state)=>state.user.user);




  return (
    <div className='profile_container'>
        <div className="profile_userimg-wrap">
          <img className='profile_userimg' src={user.avatarURL.medium||avatar} alt="" />
        </div>
        <div className="profile_wrap-user-status-edit">
          <div className="profile_wrap-user-status">
            <div className="profile_username">{user.username}</div>
            <div className="profile_status">Online <img src={arrow_bottom} alt="" /></div>
          </div>
          <div className=""><button className='profile_btn'><img src={pencil} alt="" />Редактировать профиль</button></div>
        </div>
    </div>
  )
}
export default  Profile;
