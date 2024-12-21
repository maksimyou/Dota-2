import { LegacyRef, RefObject, useEffect, useRef } from 'react'
import './FileInput.scss'
import { MdAttachFile } from 'react-icons/md'
import FilePreview from '../FilePreview/FilePreview'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import {setFile} from '../../../redux/message/actions'
const FileInput = () => {

    // извлекаем файл и метод для его обновления из хранилища
    const dispatch = useAppDispatch()
    const {file} = useAppSelector(state=>state.message)
  // иммутабельная ссылка на инпут для добавления файла
  // мы скрываем инпут за кнопкой
  const inputRef = useRef<HTMLInputElement>() as LegacyRef<HTMLInputElement>|undefined|null

  // сбрасываем значение инпута при отсутствии файла
  useEffect(() => {
    if (!file) {
      (inputRef as RefObject<HTMLInputElement|null>).current!.value = ''
    }
  }, [file])

  return (
    <div className='container-file-input file'>
      <input
        type='file'
        accept='image/*, audio/*, video/*'
        onChange={(e) => dispatch(setFile(e.target.files![0]))}
        className='visually-hidden'
        ref={inputRef}
      />
      <button
        type='button'
        className='btn'
        // передаем клик инпуту
        onClick={() => (inputRef as RefObject<HTMLInputElement|null>).current!.click()}
      >
        <MdAttachFile className='file-input-icon' />
      </button>

      {file && <FilePreview />}
    </div>
  )
}

export default FileInput