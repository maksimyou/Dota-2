import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { ListRooms, NewRoom, RoomMessageChat, SocketState} from './types'
import axios from 'axios'
//import axios from 'axios'

const initialState: SocketState = {
    loading:false,
    users: [],
    rooms:{
        roomsId:[],
        usersId:{}
    },
    log:'',
    messages:[],
    error:'',
    devSocket:false
}

export const fetchGetDataUserRooms = createAsyncThunk<ListRooms,undefined,{rejectValue:string}>(
    'socket/fetchGetDataUserRooms',
    async (_,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.get('http://localhost:5000/api/socket/get-rooms',{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const rooms:ListRooms = response.data;
                return rooms
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)



export const fetchCreateUserRoom = createAsyncThunk<NewRoom,RoomMessageChat,{rejectValue:string}>(
    'socket/fetchCreateUserRoom',
    async (dataRoomMessage,{rejectWithValue}) => {
        const token:string = JSON.parse(localStorage.getItem('token') as string)
        try {
            const response = await axios.post('http://localhost:5000/api/socket/create-room',dataRoomMessage,{
                headers: {
                Authorization: 'Bearer ' + token
            }
            });
            const roomId:NewRoom = response.data;
                return roomId
        } catch (error) {
            return  rejectWithValue(error.message ) 
        }
    },
)



export const authSocketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        // Обработка получения токена из параметров URL
        setLog: (state,action) => {
                state.log = action.payload
        },
        setUsers:  (state,action) => {
            state.users = action.payload
        },
        setMessages: (state,action) => {
            state.messages = action.payload
        },
        setDevSocket: (state,action) => {
            state.devSocket = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchGetDataUserRooms.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchGetDataUserRooms.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchGetDataUserRooms.fulfilled ,(state,action)=>{
            state.rooms = action.payload 
            state.loading = false
        })
        .addCase(fetchCreateUserRoom.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchCreateUserRoom.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
        })
        .addCase(fetchCreateUserRoom.fulfilled ,(state,action)=>{
            console.log(action.payload);
            if(action.payload.roomId !== ''){
                state.rooms.roomsId.push(action.payload.roomId);
                state.rooms.usersId[action.payload.roomId] = action.payload.usersId;
            }
            state.loading = false
        })
    },
})



// Action creators are generated for each case reducer function
export const { setLog,setUsers,setMessages,setDevSocket } = authSocketSlice.actions

export default authSocketSlice.reducer