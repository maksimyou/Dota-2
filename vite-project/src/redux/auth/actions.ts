import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState,DataReg,LoginData } from './types'
import axios, { AxiosRequestConfig } from 'axios'

const initialState: AuthState = {
    loading: false,
    error:'',
    token:'',
    auth:false,
    errorMessageReg:''
}



export const fetchLogin = createAsyncThunk<string,LoginData,{rejectValue:string}>(
    'auth/fetchLogin',
    async (loginData,{rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/login',loginData);
            const token:string = response.data.token;
            return token 
        } catch (error) {
            console.log(error)
            return  rejectWithValue(error.message ) 
        }
    },
)


export const fetchRegistration = createAsyncThunk<string,DataReg,{rejectValue:string}>(
    'auth/fetchRegistration',
    async (dataReg,{rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/registration',dataReg);
            const token:string = response.data.token;
                return token
        } catch (error) {
            console.log(error)
            return  rejectWithValue(error.response.data.message ) 
        }
    
    },
)


export const fetchAuthSteam = createAsyncThunk<void,undefined,{rejectValue:string}>(
    'auth/fetchAuthSteam',
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/api/steam/auth/steam');
            const link = response.data;
            console.log(link)
            window.location.href = link;
        } catch (error) {
            return  rejectWithValue(error.message) 
        }
    
    },
)



export const fetchAuthSteamCheckToken = createAsyncThunk<boolean,undefined,{rejectValue:string}>(
    'auth/fetchAuthSteamCheckToken',
    async (_,{rejectWithValue}) => {
        try {
            const token:string = JSON.parse(localStorage.getItem('token') as string)
            const response = await axios.get('http://localhost:5000/api/steam/auth/steam/check',{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const access:boolean = response.data.access;
            if(access){
                return access
            }else{
                return rejectWithValue('У вас нет доступа к сайту') 
            }
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    
    },
)


export const authSteamSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Обработка получения токена из параметров URL
        getToken: (state) => {
            const query = new URLSearchParams(window.location.search);
            if(query.get('token')){
                state.token = query.get('token') as string
                localStorage.setItem('token', JSON.stringify(query.get('token')));
                state.auth = true
                window.location.href = 'http://localhost:5173/'
            }
        },
        exit: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('idUser');
            state.token = ''
            state.auth = false
        },

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuthSteam.rejected, (state, action) => {
            state.error = action.payload as string
        })
        .addCase(fetchAuthSteamCheckToken.pending,(state)=>{
            state.loading = false
        })
        .addCase(fetchAuthSteamCheckToken.fulfilled ,(state,action)=>{
            state.auth = action.payload as boolean
        })
        .addCase(fetchAuthSteamCheckToken.rejected, (state, action) => {
            state.error = action.payload as string
        })
        .addCase(fetchRegistration.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
            state.token = action.payload as string
            localStorage.setItem('token', JSON.stringify(action.payload));
            state.auth = true
            state.loading = false
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
            state.errorMessageReg = action.payload as string
            state.loading = false
        })
        .addCase(fetchLogin.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        .addCase(fetchLogin.fulfilled, (state,action) => {
            state.token = action.payload as string
            localStorage.setItem('token', JSON.stringify(action.payload));
            state.auth = true
            state.loading = false
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        
    },
})


// Action creators are generated for each case reducer function
export const { getToken,exit } = authSteamSlice.actions

export default authSteamSlice.reducer