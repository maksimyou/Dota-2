import {Dispatch, FC,useState,SetStateAction, useEffect} from 'react'
import './Modal.css'
import {Heroes} from '../../../Component/types/type'
import Loader from '../../Loader/Loader'

interface Modal{
    setShow:Dispatch<SetStateAction<boolean>>,
    heroes:Heroes[]
}

const Modal:FC<Modal> =({heroes,setShow}) => {
    heroes
    const [load, setLoad] = useState<boolean>(true);
    const [id, setId] = useState<number>(0);
    
    const displayHero = (arr:Heroes[]) => {
      setTimeout(()=>{
        setLoad(false)
      },1000)
      setId(Math.floor(Math.random() * arr.length))
    }
    useEffect(()=>{
      displayHero(heroes);
    },[heroes])
  return (
    <>{
          <div className='modal_container'>
            {
              load?<Loader/>:<div className="modal_panel">
              <div onClick={()=>{setShow(false)}} className="close">X</div>
              <div className="name_heroes">{heroes[id].localized_name}</div>
              <img className='image_heroes' src={`https://api.opendota.com${heroes[id].img}`} alt="" />
          </div>
            }
          </div>
    }</>
    
  )
}

export default  Modal;
