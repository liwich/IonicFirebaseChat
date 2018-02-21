import { Profile } from "../models/profile/profile";
import { Message } from "../models/messages/message";
import { USER_LIST } from "./users";

const messageList: Message[] =[
    {user: USER_LIST[0], date: new Date(), lastMessage:"hola prro"},
    {user: USER_LIST[1], date: new Date(), lastMessage:"adios prro"}
];

export const MESSAGE_LIST= messageList;