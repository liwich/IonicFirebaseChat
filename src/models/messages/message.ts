import { Profile } from './../profile/profile';
export interface Message {
    user:Profile
    date:Date;
    lastMessage:string;
}