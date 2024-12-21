interface Audio {
        echoCancellation: boolean;
        autoGainControl: boolean;
        noiseSuppression: boolean
}

interface Video {
    width: number,
    height: number,
    frameRate: number
}

export interface AudioConstraints {
    audio: Audio,
    video?: Video
}

export interface VideoConstraints extends AudioConstraints  {
    video: Video
}


export type allConstraints = AudioConstraints|VideoConstraints