
import { registrationMutation } from './mutations/registration.js';
import  { loginMutation } from './mutations/login.js';
import { meQuery } from './Query/me.js';


const resolvers = {
   
    Query :{
       
        me: meQuery

    },

    Mutation:{
    registration:registrationMutation,
    login:loginMutation

    }

}


export default resolvers