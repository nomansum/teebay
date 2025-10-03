
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {checkEmail} from '../../../utils/auth.js'


const JWT_SECRET = process.env.JWT_SECRET;


export const loginMutation = async(_,{email,password},{prisma,user})=>{

              if(!checkEmail(email)) throw new Error("Invalid email format"); 
     
        try {
            const user = await prisma.user.findUnique({where:{email}})

        if(!user) throw new Error("No Such user found")

        const valid = await bcrypt.compare(password,user.password)
        
        if(!valid) throw new Error("Invalid Password")
     
        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET)
        
        return token

        } catch (error) {
            throw new Error("Something happend with db")
        }


    }
  
