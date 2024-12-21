import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState,UserData, FriendsData } from './types'
import {useAppDispatch,useAppSelector} from '../../hooks/useTypeSelectDispstch'
import axios from 'axios'

const initialState: UserState = {
    user: {
        id:0,
        username: '',
        firstName: '',
        lastName: '',
        role: '',
        level: 0,
        playstyle: '',
        about_me: '',
        avatarURL: {
            small: '',
            medium: '',
            large: ''
        }
    },
    loading:false,
    error:'',
    users:[],
    friends:[]
}


export const fetchGetDataUser = createAsyncThunk<UserData,undefined,{rejectValue:string}>(
    'user/fetchGetDataUser',
    async (_,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.get('http://localhost:5000/api/user/get-user',{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const user:UserData = response.data;
                return user
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)



export const fetchGetUsers = createAsyncThunk<UserData[],undefined,{rejectValue:string}>(
    'user/fetchGetUsers',
    async (_,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.get('http://localhost:5000/api/user/get-users',{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const users:UserData[] = response.data;
                return users
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)

export const fetchGetFriends = createAsyncThunk<UserData[],undefined,{rejectValue:string}>(
    'user/fetchGetFriends',
    async (_,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.get('http://localhost:5000/api/user/get-friends',{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const friends:UserData[] = response.data;
                return friends
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)



export const fetchAddFriends = createAsyncThunk<string,FriendsData,{rejectValue:string}>(
    'user/fetchAddFriends',
    async (friendsData,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.post('http://localhost:5000/api/user/add-friend',friendsData,{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const message:string = response.data;
            console.log(message);
            return message
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchGetDataUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchGetDataUser.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchGetDataUser.fulfilled ,(state,action)=>{
            state.user = action.payload as UserData
            localStorage.setItem('idUser',JSON.stringify({userId:action.payload.id, userName:action.payload.username}))
            state.loading = false
        })

        .addCase(fetchGetUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchGetUsers.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchGetUsers.fulfilled ,(state,action)=>{
            state.users = action.payload as UserData[]
            state.loading = false
        })



        .addCase(fetchGetFriends.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchGetFriends.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchGetFriends.fulfilled ,(state,action)=>{
            state.friends = action.payload as UserData[]
            state.loading = false
        })

        
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer