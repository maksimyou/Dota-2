import React from 'react'
import './GameInformation.scss'
const GameInformation = () => {
  return (
    <div className='game-information-container'>
        <div className="game-information-content">
            <div className="game-information-title">Игровая информация</div>
            <div className="">
                <label className='game-information-input-select' htmlFor="">Роль: 
                    <select className='' name="" id="">
                        <option value="support">Саппорт</option>    
                        <option value="roamer">Роумер</option>
                        <option value="offlaner">Оффлейнер</option>    
                        <option value="mid">Мидер</option>                    
                        <option value="carry">Керри</option>                    
                    </select>
                </label>
                <label className='game-information-input-select' htmlFor="">Рейтинг: <input min={0} className='' type="number" placeholder='Рейтинг' /></label>
                <div className='game-information-subtitle'>Стили игры: 
                    <div className="">
                        <label htmlFor="game-information-input-select">
                            По темпу игры:
                            <select className='' name="" id="">
                                <option value="aggressive">Агрессивный</option>
                                <option value="passive">Пассивный</option>
                            </select>
                        </label>
                        <label htmlFor="game-information-input-select">
                            По стратегии:
                            <select className='' name="" id="">
                                <option value="pass">Пуш</option>
                                <option value="gank">Ганк</option>
                                <option value="card-control">Контроль карты</option>
                                <option value="split-push">Сплит пуш</option>
                            </select>
                        </label>
                    </div>
                </div>
                <label className='game-information-input-select' htmlFor="">Ваш любимый герой: <input className='' type="text" placeholder='Любимый герой'/></label>
            </div>
        </div>
    </div>
  )
}

export default GameInformation