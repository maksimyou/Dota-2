
export interface AuthState {
    loading: boolean,
    error:string,
    token:string,
    auth:boolean,
    errorMessageReg:string
}

export interface DataReg{
    username:string,
    password:string,
    email:string
}

export interface LoginData{
    password:string,
    email:string,

}