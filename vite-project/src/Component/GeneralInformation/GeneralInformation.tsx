import React from 'react'
import './GeneralInformation.scss'



const GeneralInformation = () => {

  return (
    <div className='general-information-container'>
        <div className="general-information-content">
            <div className="general-information-title">Общая информация</div>
            <div className="general-information-wrap-input">
                <label className='general-information-input' htmlFor="">Имя:<input className='' placeholder='Имя' type="text" /></label>
                <label className='general-information-input' htmlFor="">Фамилия:<input className='' placeholder='Фамилия' type="text" /></label>
                <label className='general-information-input' htmlFor="">Пол: 
                    <select className='' name="" id="">
                        <option value="">Мужской</option>    
                        <option value="">Женский</option>                    
                    </select>
                </label>
                <div className='general-information-input'>Дата рождения: 
                    <div className="general-information-input-date">
                        <div className="month-day-year">
                            День:<input min={1} max={31} className='' type="number" placeholder='День' name="" id="" />
                            <div className="month-day-year">
                        </div> 
                            Месяц:<select id="month">
                                <option value="01">Январь</option>
                                <option value="02">Февраль</option>
                                <option value="03">Март</option>
                                <option value="04">Апрель</option>
                                <option value="05">Май</option>
                                <option value="06">Июнь</option>
                                <option value="07">Июль</option>
                                <option value="08">Август</option>
                                <option value="09">Сентябрь</option>
                                <option value="10">Октябрь</option>
                                <option value="11">Ноябрь</option>
                                <option value="12">Декабрь</option>
                            </select>
                        </div>
                        <div className="month-day-year">Год:<input min={1900} max={new Date().getFullYear()} className='' type="number" placeholder='Год' name="" id="" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GeneralInformation