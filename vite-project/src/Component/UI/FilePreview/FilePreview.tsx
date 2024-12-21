import { FC, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import {setFile} from '../../../redux/message/actions'
import './FilePreview.scss'


const FilePreview:FC = () => {
    const dispatch = useAppDispatch()
    const {file} = useAppSelector(state=>state.message)
     // извлекаем файл и метод для его обновления из хранилища
  // локальное состояние для источника файла
  const [src, setSrc] = useState<string>()
  // локальное состояние для типа файла
  const [type, setType] = useState<string>('')

  // при наличии файла обновляем источник и тип файла
  useEffect(() => {
    if (file) {
      setSrc(URL.createObjectURL(file))
      setType(file.type.split('/')[0])
    }
  }, [file])

  // элемент для рендеринга зависит от типа файла
  let element

  switch (type) {
    case 'image':
      element = <img src={src} alt={file!.name} />
      break
    case 'audio':
      element = <audio src={src} controls></audio>
      break
    case 'video':
      element = <video src={src} controls></video>
      break
    default:
      element = null
      break
  }
  return (
    <div className='container-file-preview preview'>
    {element}
    <button
      type='button'
      className='btn close'
      // обнуляем файл при закрытии превью
      onClick={() => dispatch(setFile(null))}
    >
      <AiOutlineClose className='icon close' />
    </button>
  </div>
  )
}

export default FilePreview