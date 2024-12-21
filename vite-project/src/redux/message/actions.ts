import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataFile, MessageState, } from './types'
import axios from 'axios'

const initialState: MessageState = {
    file: null,
    showPreview:false,
    showEmoji:false,
    path :'',
    loading:false
}


export const fetchUpload = createAsyncThunk<string,DataFile,{rejectValue:string}>(
    'message/fetchUpload',
    async (dataFile,{rejectWithValue}) => {
        try {
            const body = new FormData()
            console.log(dataFile.file);
            body.append('file', dataFile.file);
            console.log(body);
        
            const response = await axios.post('http://localhost:5000/api/socket/upload',body,{
                headers:{
                    'x-room-id': dataFile.roomId,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const path:string = response.data;
                return path
        } catch (error) {
            console.log(error)
            return  rejectWithValue(error.response.data.message ) 
        }
    
    },
)




//WritableDraft<File>|null 
export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        // Обработка получения токена из параметров URL
        setFile: (state,action) => {
            const prevFile:unknown = state.file
            if (prevFile) {
              // https://w3c.github.io/FileAPI/#creating-revoking
              // это позволяет избежать утечек памяти
            URL.revokeObjectURL(prevFile as string)
            }
            // обновляем файл
            console.log(action.payload);
            
            state.file = action.payload
            console.log(state.file);

        },
        // Метод для сбраса файла в сообщении 
        clearFile: (state) => {
            state.file = null
        },
          // метод для обновления индикатора отображения превью
        setShowPreview: (state,action) => {
            state.showPreview = action.payload
        },
          // метод для обновления индикатора отображения эмодзи
        setShowEmoji: (state,action) => {
            state.showEmoji = action.payload
        },
    },
    extraReducers: (builder) => {
        builder 
        .addCase(fetchUpload.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchUpload.rejected, (state) => {
            state.loading = false
        })
        .addCase(fetchUpload.fulfilled ,(state,action)=>{
            state.path = action.payload as string
            console.log(5,action.payload)
            state.loading = false
        })
    },
})


// Action creators are generated for each case reducer function
export const { setFile,setShowPreview,setShowEmoji,clearFile } = messageSlice.actions

export default messageSlice.reducer