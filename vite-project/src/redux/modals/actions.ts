import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ModalState} from './types'
import axios, { AxiosRequestConfig } from 'axios'

const initialState: ModalState = {
    loading: false,
    error:'',
    showNewMessage:false,
    avatarURL:'',
    username:'',
    id:0
}



export const ModalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        // Отобразить модальное окно нового сообщения
        setShowNewMessage: (state,action) => {
            const {show, avatarURL, username, id} = action.payload
            state.showNewMessage = show
            state.avatarURL = avatarURL
            state.username = username
            state.id = id

        },

    },




    //const {show, avatarURL, username, id} = action.payload

    extraReducers: (builder) => {
        builder
        
    },
})


// Action creators are generated for each case reducer function
export const { setShowNewMessage } = ModalSlice.actions

export default ModalSlice.reducer