import {FC} from 'react'
import './Main.css'
import {Heroes} from '../types/type'
interface Ppp{
    heroes:Heroes[]
  }
import string from  '../../assets/Level dot.png'
import agility from  '../../assets/Level dot2.png'
import Intelligence from  '../../assets/Level dot3.png'


const Main:FC<Ppp> = ({heroes}) => {
  return (
    <div className='main_container'>
        <div className="main_container_group_one">
            <div className="main_group_title"><img src={string} alt="" />STRENGTH</div>   
            <div className="main_group_one_table table">
                {heroes.filter(e=>{return e.primary_attr==='str'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_second">
            <div className="main_group_title"><img src={agility} alt="" />AGILITY</div>   
            <div className="main_group_second_table table">
                {heroes.filter(e=>{return e.primary_attr==='agi'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_third">
            <div className="main_group_title"><img src={Intelligence} alt="" />Intelligence</div>   
            <div className="main_group_third_table table">
                {heroes.filter(e=>{return e.primary_attr==='int'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
        <div className="main_container_group_four">
            <div className="main_group_title"><img src={string} alt="" /><img src={agility} alt="" /><img src={Intelligence} alt="" />Universal</div>   
            <div className="main_group_four_table table">
                {heroes.filter(e=>{return e.primary_attr==='all'}).map(elem=>{
                    return <div style={ {backgroundImage: `url(https://api.opendota.com${elem.img})`}} className='group_one_table_icons'>{elem.localized_name}</div>
                })}
            </div>
        </div>
    </div>
  )
}
export default  Main;