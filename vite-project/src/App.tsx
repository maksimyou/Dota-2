import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Component/Header/Header'
import Main from './Component/Main/Main'
import Loader from './Component/Loader/Loader'
import Modal from './Component/UI/Modal/Modal'

import './App.css'
import {Playres,Heroes} from './Component/types/type'


function App() {
  const [players, setPlayers] = useState<Playres>({} as Playres);
  const [heroes, setHeroes] = useState<Heroes[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [load2, setLoad2] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
const getPlayersApi = (account_id:string='268590680')=>{
    setLoad(false);
  axios.get(`https://api.opendota.com/api/players/${account_id}`)
  .then(resp=> {
    console.log(resp)
    setLoad(true);
    setPlayers(resp.data)
  });
}

const getHeroesApi = ()=>{
  setLoad2(false);
axios.get(`https://api.opendota.com/api/heroStats`)
.then(resp=> {
  console.log(resp)
    setLoad2(true);
    setHeroes(resp.data)
});
}

const getPlayersApi2 = ()=>{
  axios.get('https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=6B81C1219C0AA6583B9E1AF7F30365C9&steamid=76561198361401745')
  .then(resp=> {
    console.log('steam ==== ',resp)
  });
}
useEffect(()=>{
  getPlayersApi();
  getPlayersApi2();
  getHeroesApi();
  
},[setPlayers])

console.log(players);
  return (
    <>
    {
      load&&load2?<>
      <Header players={players}/>
      <Main heroes={heroes}/>
      <div  className="container_random"><button onClick={()=>{setShow(true)}} className='btn_random'>Random</button></div>
      {show?<Modal setShow={setShow} heroes={heroes}/>:''}
      </>:<Loader/>
    }
    </>
  )
}

export default App
