import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Component/Header/Header'
import Main from './pages/Main/Main'
import Loader from './Component/Loader/Loader'
import Modal from './Component/UI/Modal/Modal'
import {useAppDispatch,useAppSelector} from './hooks/useTypeSelectDispstch'
import {fetchAuthSteam,getToken,fetchAuthSteamCheckToken,} from './redux/auth/actions'
import {fetchGetDataUser, fetchGetFriends} from './redux/user/actions'

import './App.scss'
import {Playres,Heroes} from './Component/types/type'
import { Outlet } from 'react-router-dom'
import { fetchGetDataUserRooms } from './redux/socket/actions'


function App() {
  let dispatch = useAppDispatch()
  const loading = useAppSelector((state)=>state.auth.loading);
  const auth = useAppSelector((state)=>state.auth.auth);


  //const [players, setPlayers] = useState<Playres>({} as Playres);
  const [heroes, setHeroes] = useState<Heroes[]>([]);
 


//const getPlayersApi = (account_id:string='268590680')=>{
//    setLoad(false);
//  axios.get(`https://api.opendota.com/api/players/${account_id}`)
//  .then(resp=> {
//    console.log(resp)
//    setLoad(true);
//    setPlayers(resp.data)
//  })
//  .catch(er=>console.log(er))
  
//}

//const getHeroesApi = ()=>{
//  setLoad2(false);
//axios.get(`https://api.opendota.com/api/heroStats`)
//.then(resp=> {
//  console.log(resp)
//    setLoad2(true);
//    setHeroes(resp.data)
//})
//.catch(er=>console.log(er))
//}


//const getPlayersApi2 = ()=>{
//  axios.get('https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=6B81C1219C0AA6583B9E1AF7F30365C9&steamid=76561198361401745')
//  .then(resp=> {
//    console.log('steam ==== ',resp)
//  })
//  .catch(er=>console.log(er))
//}



async function authUserAsyncFunctions() {
    const token:string = JSON.parse(localStorage.getItem('token') as string)
    dispatch(getToken())
    if(token){
      console.log('888888888888888888888888888888888888888888888');
      
      await dispatch(fetchAuthSteamCheckToken())
      await dispatch(fetchGetDataUser())
      await dispatch(fetchGetFriends())
      await dispatch(fetchGetDataUserRooms()) //Перенести в компонент комнаты пользователей чата
    }
}



useEffect(()=>{
  authUserAsyncFunctions()
},[])


  return (
      <>
      {loading&&<Loader/>}
      <Header/>
      {auth?<Main/>:''}
      </>
  )
}

export default App
