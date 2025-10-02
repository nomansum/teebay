
const {PrismaClient}  = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {checkEmail} = require('../../utils/auth.js');
const { registrationMutation } = require('./mutations/registration.js');
const { loginMutation } = require('./mutations/login.js');
const { meQuery } = require('./Query/me.js');


const resolvers = {
   
    Query :{
       
        me: meQuery

    },

    Mutation:{
    registration:registrationMutation,
    login:loginMutation

    }

}


module.exports = resolvers