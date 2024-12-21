import Picker from '@emoji-mart/react'
//import 'emoji-mart/css/emoji-mart.css'
import { FC, useCallback, useEffect, Dispatch, SetStateAction } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import {useAppDispatch,useAppSelector} from '../../../hooks/useTypeSelectDispstch'
import {setShowEmoji} from '../../../redux/message/actions'
import './EmojiMart.scss'


interface EmojiMartProps{
    setText:Dispatch<SetStateAction<string>>;
    messageInput:HTMLInputElement|undefined|null
}

const EmojiMart:FC<EmojiMartProps> = ({ setText, messageInput }) => {
const dispatch = useAppDispatch()
    const {showEmoji,showPreview} = useAppSelector(state=>state.message)

// обработчик нажатия клавиши `Esc`
    const onKeydown = useCallback(
        (e: any) => {
            if (e.key === 'Escape') {
                dispatch(setShowEmoji(false))
            }
        },
        [setShowEmoji]
    )

    
  // регистрируем данный обработчик на объекте `window`
    useEffect(() => {
        window.addEventListener('keydown', (event) => onKeydown(event))

        return () => {
            window.removeEventListener('keydown', (event) => onKeydown(event))
           
        }
    }, [onKeydown])


      // метод для добавления эмодзи к тексту сообщения
    const onSelect = ({ native }:any) => {
        console.log('sdfsdfsdf',native);
        
        setText((text:any) => text + native)
        messageInput!.focus()
    }


  return (
    <div className='container emoji'>
        <button
            className='btn'
            type='button'
            // отображаем/скрываем эмодзи при нажатии кнопки 
            onClick={() => dispatch(setShowEmoji(!showEmoji))}
            disabled={showPreview}
        >
            <BsEmojiSmile className='emoji-mart-icon' />
        </button>
        {showEmoji && (
        <div className = 'list-emoji'>
            <Picker
                onEmojiSelect={onSelect}
                emojiSize={20}
                showPreview={false}
                perLine={6}
            />
        </div>
        )}
    </div>
  )
}

export default EmojiMart