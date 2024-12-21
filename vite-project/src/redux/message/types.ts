
export interface MessageState {
    file: File|null,
    showPreview:boolean,
    showEmoji:boolean,
    path :string,
    loading:boolean
}

export interface DataFile {
    file:File;
    roomId:number
}


