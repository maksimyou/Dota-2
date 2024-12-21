import React, { FC,useEffect, useState } from 'react'
import  './Login.scss'
import steam from '../../../assets/steam.png'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import {fetchAuthSteam,  fetchLogin} from '../../../redux/auth/actions'
import {fetchGetDataUser} from '../../../redux/user/actions'


import { DataLogin } from '../../types/type'

interface PropsLogin{
    openModalReg:()=>void,
    closeModalLogin:()=>void
}
const Login:FC<PropsLogin> = ({openModalReg,closeModalLogin})=> {
    const [dev, setDev] = useState<boolean>(false);
    const [devLog, setDevLog] = useState<boolean>(false);
    const [allowMail, setAllowMail] = useState<boolean>(false);
    const [messageMail, setMessageMail] = useState<boolean>(false);
    const [allowPassword, setAllowPassword] = useState<boolean>(false);
    const [messagePassword, setMessagePassword] = useState<boolean>(false);
    const errorMessageReg = useAppSelector((state)=>state.auth.errorMessageReg);
    const auth = useAppSelector((state)=>state.auth.auth);
    const error = useAppSelector((state)=>state.auth.error);

    const [dataLogin,setDataLogin] = useState<DataLogin>({
        password:'',
        email:''
    })
    const dispatch = useAppDispatch()

    const closeModalLoginAsynс = async () => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        if(token){
            closeModalLogin()
        }
    }
    
    const validationFormDataLog = async ()=>{
        if(allowMail&&allowPassword){
            await dispatch(fetchLogin(dataLogin))
        }
            await dispatch(fetchGetDataUser())
            await closeModalLoginAsynс()
    }

    const CheckingPassword = (str:string):void => {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (passwordRegex.test(str)) {
            setAllowPassword(true)
            setMessagePassword(false)
            setDataLogin({...dataLogin,password:str})
        } else {
            setAllowPassword(false)
            setMessagePassword(true)
            setDataLogin({...dataLogin,password:str})
        }
    }
    const CheckingMail = (str:string):void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(str)) {
            setAllowMail(true)
            setMessageMail(false)
            setDataLogin({...dataLogin,email:str})
        } else {
            setAllowMail(false)
            setMessageMail(true)
            setDataLogin({...dataLogin,email:str})
        }
    }

//async function authUserAsyncFunctions() {
//  try {
//    const token:string = JSON.parse(localStorage.getItem('token') as string)
//    dispatch(getToken())
//    if(token){
//      await dispatch(fetchAuthSteamCheckToken())
//      await dispatch(fetchGetDataUser())
//    }
//    console.log('Все асинхронные функции выполнены последовательно');
//  } catch (error) {
//    console.error('Произошла ошибка:', error);
//  }
//}



    useEffect(()=>{
        if(devLog){validationFormDataLog();setDevLog(false)}
        if(dev){dispatch(fetchAuthSteam());setDev(false)}
    },[dev,devLog]);


  return (
    <div onClick={closeModalLogin} className='login-container'>
        <div onClick={e=>e.stopPropagation()} className="login-wrap">
            <div className="login-content">
                <div onClick={closeModalLogin} className="login-close"></div>
                <div className="login-nav-reg-login">
                    <div onClick={()=>{openModalReg();closeModalLogin()}} className="login-login">Регистрация</div>
                    <div className="login-forgot-password">Забыл пароль</div>
                </div>
                <div className="login-form">
                    <input value={dataLogin.email} onInput={(e)=>{CheckingMail((e.target as HTMLInputElement).value)}} type="email" name="" id="" placeholder='Введите email'/>
                    {messageMail&&<div className="login-message">Некорректный email.</div>}
                    <input value={dataLogin.password} onInput={(e)=>{CheckingPassword((e.target as HTMLInputElement).value)}} type="password" name="" id="" placeholder='Введите пароль'/>
                    {messagePassword&&<div className="login-message">Ваш пароль должен содержать до 8 символов верхнего и нижнего регистров, а так же цифры.</div>}
                </div>
                <button onClick={(e)=>{setDevLog(true);}} className='login-enter-btn'>Вход</button>
                <div className="login-message">{errorMessageReg}</div>
                <div className="login-separation-line"></div>
                <button onClick={()=>setDev(true)} className='login-btn'>
                    <img src={steam} alt="" />
                    <span>Войти через Steam</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login