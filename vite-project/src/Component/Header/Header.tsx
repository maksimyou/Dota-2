import  { useState, FC } from 'react'
import './Header.scss'
import Profile from '../Profile/Profile'
import Logo from '../../assets/Vector.png'
import shop from '../../assets/Group.png'
import notification from '../../assets/Notifications.png'
import setting from '../../assets/Settings.png'
import enter from '../../assets/Settings_enter.png'
import authImg from '../../assets/auth.svg'
import Registration from '../UI/Registration/Registration'
import Login from '../UI/Login/Login'

import {useAppDispatch,useAppSelector} from '../../hooks/useTypeSelectDispstch'
import {exit} from '../../redux/auth/actions'

import {Playres} from '../types/type.ts'
import { Link } from 'react-router-dom'
interface PropsHeader{
}
const Header:FC<PropsHeader> = ()=> {
  const dispatch = useAppDispatch()
  const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  const [isModalOpenReg, setIsModalOpenReg] = useState<boolean>(false);
  

  const auth = useAppSelector((state)=>state.auth.auth);
  const openModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenLogin(false);
  };

  const openModalReg = () => {
    setIsModalOpenReg(true);
  };

  const closeModalReg = () => {
    setIsModalOpenReg(false);
  };

  const exitUser = ()=>{
    const token = localStorage.getItem('token')
    if(token){
      dispatch(exit())
    }
  }


  return (
    <>{isModalOpenReg&&<Registration openModalLogin={openModalLogin} closeModalReg={closeModalReg}/>}
      {isModalOpenLogin&&<Login openModalReg={openModalReg} closeModalLogin={closeModalLogin}/>}
      <div className='header_container'>
          <div className="header_nav_list">
            <div className="logo_header_img">
                <img src={Logo} alt="" />
            </div>
            {/*<ul>
              <li className='list_header_link'><Link to='/'>Главная</Link></li>
              <li className='list_header_link'>Герои</li>
              <li className='list_header_link'>История</li>
              <li className='list_header_link'>Просмотр</li>
              <li className='list_header_link'>Гайды</li>
              <li className='list_header_link'>Хуита</li>
            </ul>*/}
          </div>
        {auth?<div className="header_user-panel">
            <div className="header_shop">
              <img src={shop} alt="" />
              <div className="header_money">800</div>
            </div>
            <img className ='header_notification' src={notification} alt="" />
            <Link to='setting'><img className="header_setting" src={setting} alt="" /></Link>
            <div className="line_vertical"></div>
            <div className=""></div>
            <img onClick={()=>exitUser()} className='header_exit' src={enter} alt="" />
            </div>
            :
            <div onClick={openModalLogin} className="header_enter-wrap"><span>Войти</span><img className='header_enter' src={authImg} alt="" /></div>
            }
      </div>
    </>
  )
}
export default Header;
