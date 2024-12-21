import useStore from 'hooks/useStore'
import './Recorder.scss'
import { useState } from 'react'
import { RiRecordCircleLine } from 'react-icons/ri'


import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import RecordingModal from '../RecordingModal/RecordingModal'

const Recorder = () => {
    const {showPreview} = useAppSelector(state=>state.message)

  // извлекаем индикатор отображения превью файла из хранилища
  
  // локальное состояние для индикатора отображения модального окна
  const [showModal, setShowModal] = useState<boolean>(false)


  return (
    <div className='container recorder'>
    <button
      type='button'
      className='btn'
      // показываем модальное окно при нажатии кнопки
      onClick={() => setShowModal(true)}
      // блокируем кнопку при отображении превью файла
      disabled={showPreview}
    >
      <RiRecordCircleLine className='recorder-icon' />
    </button>
    {showModal && <RecordingModal setShowModal={setShowModal} />}
  </div>
  )
}

export default Recorder