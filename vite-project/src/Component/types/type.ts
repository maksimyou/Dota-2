interface Profile {
        account_id: string,
        personaname: string,
        name: string,
        plus: true,
        cheese: string,
        steamid: string,
        avatar: string,
        avatarmedium: string,
        avatarfull: string,
        profileurl: string,
        last_login: string,
        loccountrycode: string,
        is_contributor: boolean,
        is_subscriber: boolean
}

interface  Mmr{
    estimate: string
}

interface Avatar{
        small: string,
        medium: string,
        large: string
}
export  interface Playres {
        solo_competitive_rank: string,
        competitive_rank: string,
        rank_tier: string,
        leaderboard_rank: string,
        mmr_estimate:Mmr,       
        profile: Profile
}

export  interface Heroes {
        id: number,
        name:string,
        localized_name: string,
        primary_attr: string,
        attack_type: string,
        roles: string[],
        legs: number
        img:string,
        icon: string,
      }


      
export interface DataReg{
        username:string,
        password:string,
        email:string
    }

    export interface DataLogin{
        password:string,
        email:string
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

    