import React, { FC,useEffect, useState } from 'react'
import './Registration.scss'
import steam from '../../../assets/steam.png'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import {fetchAuthSteam,fetchRegistration} from '../../../redux/auth/actions'
import { DataReg } from '../../types/type'

interface PropsRef{
    closeModalReg:()=>void,
    openModalLogin:()=>void,
}

const Registration:FC<PropsRef> = ({closeModalReg,openModalLogin}:PropsRef) => {
    const errorMessageReg = useAppSelector((state)=>state.auth.errorMessageReg);
    const auth = useAppSelector((state)=>state.auth.auth);
    const [dev, setDev] = useState<boolean>(false);
    const [devReg, setDevReg] = useState<boolean>(false);
    const [allowMail, setAllowMail] = useState<boolean>(false);
    const [messageMail, setMessageMail] = useState<boolean>(false);
    const [allowPassword, setAllowPassword] = useState<boolean>(false);
    const [messagePassword, setMessagePassword] = useState<boolean>(false);
    const [allowName, setAllowName] = useState<boolean>(false);
    const [messageName, setMessageName] = useState<boolean>(false);
    const [dataReg,setDataReg] = useState<DataReg>({
        username:'',
        password:'',
        email:''
    })
    const dispatch = useAppDispatch()

    const CheckingPassword = (str:string):void => {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (passwordRegex.test(str)) {
            setAllowPassword(true)
            setMessagePassword(false)
            setDataReg({...dataReg,password:str})
        } else {
            setAllowPassword(false)
            setMessagePassword(true)
            setDataReg({...dataReg,password:str})
        }
    }
    const CheckingMail = (str:string):void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(str)) {
            setAllowMail(true)
            setMessageMail(false)
            setDataReg({...dataReg,email:str})
        } else {
            setAllowMail(false)
            setMessageMail(true)
            setDataReg({...dataReg,email:str})
        }
    }
    const CheckingWorldName = (str:string):void => {
        if (str.length >= 1) {
            setAllowName(true)
            setMessageName(false)
            setDataReg({ ...dataReg, username: str })
        } else {
            setAllowName(false)
            setMessageName(true)
            setDataReg({ ...dataReg, username: str })
        }

    }

    const closeModalRegAsynс = async () => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        if(token){
            closeModalReg()

        }

    }
    
    const validationFormDataReg = async ():void=>{
        if(allowMail&&allowPassword&&allowName){
           await dispatch(fetchRegistration(dataReg))
        }    
        await closeModalRegAsynс()
    }

    
    
    useEffect(()=>{
        if(devReg){validationFormDataReg();setDevReg(false)}
        if(dev){dispatch(fetchAuthSteam());setDev(false)}
    },[dev,devReg]);

  return (
    <div onClick={closeModalReg} className='registration-container'>
        <div onClick={e=>e.stopPropagation()} className="registration-content">
            <div onClick={closeModalReg} className="registration-close"></div>
            <div className="registration-nav-reg-login">
                <div onClick={()=>{openModalLogin();closeModalReg()}} className="registration-login">Вход</div>
                <div className="registration-forgot-password">Забыл пароль</div>
            </div>
            <div className="registration-form">
                <input  value={dataReg.email} onInput={(e)=>{CheckingMail((e.target as HTMLInputElement).value)}}type="email" name="" id="" placeholder='Введите email'/>
                {messageMail&&<div className="registration-message">Некорректный email.</div>}
                <input value={dataReg.password} onInput={(e)=>{CheckingPassword((e.target as HTMLInputElement).value)}} type="password" name="" id="" placeholder='Введите пароль'/>
                {messagePassword&&<div className="registration-message">Ваш пароль должен содержать до 8 символов верхнего и нижнего регистров, а так же цифры.</div>}
                <input value={dataReg.username} onInput={(e)=>{CheckingWorldName((e.target as HTMLInputElement).value)}} type="text" placeholder='Имя пользователя'/>   
                {messageName&&<div className="registration-message">Поле ввода не должно быть пустым.</div>}
            </div>
            <button onClick={(e)=>{e.preventDefault();setDevReg(true)}} className='registration-btn-reg'>Регистрация</button>
            <div className="registration-message">{errorMessageReg}</div>
            <div className="registration-separation-line"></div>
            
            <button onClick={()=>setDev(true)} className='registration-btn'>
                <img src={steam} alt="" />
                <span>Войти через Steam</span>
            </button>
        </div>
    </div>
  )
}

export default Registration