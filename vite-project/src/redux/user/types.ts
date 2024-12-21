export interface UserState {
    user: UserData,
    loading:boolean,
    error:string,
    users:UserData[],
    friends:UserData[]
}
interface Avatar{
        small: string,
        medium: string,
        large: string
}
export interface UserData {
    id:number,
    username: string,
    firstName: string,
    lastName: string,
    role: string,
    level: number,
    playstyle: string,
    about_me: string,
    avatarURL: Avatar
}

export interface FriendsData {
    idUser:number
} 
