import { configureStore } from '@reduxjs/toolkit'
import authSteamReducer from './auth/actions'
import userReducer from './user/actions'
import socketReducer from './socket/actions'
import messageReducer from './message/actions'
import modalsReducer from './modals/actions'


export const store = configureStore({
    reducer: {
        auth: authSteamReducer,
        user:userReducer,
        socket:socketReducer,
        message:messageReducer,
        modals:modalsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch