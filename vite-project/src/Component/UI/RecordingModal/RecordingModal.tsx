import { useRef, useState,FC,Dispatch,LegacyRef,RefObject } from 'react'
import { BsFillPauseFill, BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'
import './RecordingModal.scss'
import {
  audioConstraints,
  isRecordingStarted,
  pauseRecording,
  resumeRecording,
  startRecording,
  stopRecording,
  videoConstraints
} from '../../../hooks/recording'
// извлекаем метод для обновления файла из хранилища
import {setFile} from '../../../redux/message/actions'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import { allConstraints } from '../../../hooks/type'

interface OnChangeValue {
    target:{
        value:string
    }
}

interface RecordingModalProps {
    setShowModal:Dispatch<boolean>
}

const RecordingModal:FC<RecordingModalProps> = ({ setShowModal }) => {
const dispatch = useAppDispatch()
 
 // локальное состояние для требований к потоку данных
 // по умолчанию создается аудиозапись
 const [constraints, setConstraints] = useState<allConstraints>(audioConstraints)
 // локальный индикатор начала записи
 const [recording, setRecording] = useState(false)
 // иммутабельная ссылка на элемент для выбора типа записи
 const selectBlockRef = useRef<HTMLDivElement>() as LegacyRef<HTMLDivElement>|undefined|null
 // иммутабельная ссылка на элемент `video`
 const videoRef = useRef<HTMLVideoElement>() as LegacyRef<HTMLVideoElement>|undefined|null

 // функция для обновления требований к потоку на основе типа записи
 const onChange = ({ target: { value } }:OnChangeValue) =>
   value === 'audio'
     ? setConstraints(audioConstraints)
     : setConstraints(videoConstraints)

 // функция для приостановки/продолжения записи
 const pauseResume = () => {
   if (recording) {
     pauseRecording()
   } else {
     resumeRecording()
   }
   setRecording(!recording)
 }

 // функция для начала записи
 const start = async () => {
   if (isRecordingStarted()) {
     return pauseResume()
   }

   // получаем поток
   const stream:object|undefined = await startRecording(constraints)
    console.log(stream);

   // обновляем локальный индикатор начала записи
   setRecording(true);

   // скрываем элемент для выбора типа записи
   (selectBlockRef as RefObject<HTMLDivElement|null>).current!.style.display = 'none'
   
   // если создается видеозапись
   if (constraints.video && stream) {
     (videoRef as RefObject<HTMLVideoElement|null>).current!.style.display = 'block';
     // направляем поток в элемент `video`
     (videoRef as RefObject<HTMLVideoElement|null>).current!.srcObject = stream;
   }
 }

 // функция для завершения записи
 const stop = () => {
   // получаем файл
   const file = stopRecording()

   // обновляем локальный индикатор начала записи
   setRecording(false)

   // обновляем файл
   dispatch(setFile(file))
   // скрываем модалку
   setShowModal(false)
 }







  return (
    <div
      className='recording-modal-container overlay'
      onClick={(e) => {
        // скрываем окно при клике за его пределами
        if (e.target.className !== 'overlay') return
        setShowModal(false)
      }}
    >
      <div className='modal recording-modal-content-modal'>
        <div ref={selectBlockRef}>
          <h2>Select type</h2>
          <select onChange={onChange}>
            <option value='audio'>Audio</option>
            <option value='video'>Video</option>
          </select>
        </div>

        {/* вот для чего нам нужны 2 индикатора начала записи */}
        {isRecordingStarted() && <p>{recording ? 'Recording...' : 'Paused'}</p>}

        <video ref={videoRef} autoPlay muted />

        <div className='controls recording-modal-content-controls'>
          <button className='btn play' onClick={start}>
            {recording ? (
              <BsFillPauseFill className='icon' />
            ) : (
              <BsFillPlayFill className='icon' />
            )}
          </button>
          {isRecordingStarted() && (
            <button className='btn stop recording-modal-content-btn' onClick={stop}>
              <BsFillStopFill className='icon' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecordingModal