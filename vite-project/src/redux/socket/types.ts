
export interface SocketState {
    loading:boolean,
    users: UserItem[],
    log:string,
    rooms:ListRooms,
    messages:ObjMessage[],
    error:string,
    devSocket:boolean
}

interface UserItem{
    userId: number,
    userName: string
}

export interface ObjMessage {
    id?:number,
    messageType?:string|undefined,
    textOrPathToFile?:string,
    userId:number,
    userName:string,
    createdAt?:string | (Date & string),
    roomId?:number|string
}
export interface RoomMessageChat {
    message:ObjMessage,
    toUserId:number
}

export interface ListRooms {
    roomsId:string[],
    usersId:{
        [index: string]: object[];
    }
}

export interface NewRoom {
    roomId:string,
    usersId:object[]
}
