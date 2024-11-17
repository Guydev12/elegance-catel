import {hashSync} from"bcryptjs"
const user ={
    id:'1',
    name:"Catel",
    email:'catel@gmail.com',
    password:hashSync('123456',10)
}
export {user}