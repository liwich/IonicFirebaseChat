import { Profile } from "../models/profile/profile";

const userList: Profile[]=[
    { firstName:"Paul", lastName: "Halliday", email:"paul@paul.com", avatar:"assets/img/avatar.png", dateOfBirth: new Date("08/23/1993")},
    { firstName:"Paul", lastName: "Hallidayssss", email:"paul@paul.com", avatar:"assets/img/avatar.png", dateOfBirth: new Date("08/23/1995")}
];

export const USER_LIST = userList;