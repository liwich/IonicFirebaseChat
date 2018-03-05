export interface Message {
    userFromId:string;
    userFromProfile:{
        firstName:string;
        lastName:String;
    }
    userToId:string;
    userToProfile:{
        firstName:string;
        lastName:string;
    }

    content:string;
}