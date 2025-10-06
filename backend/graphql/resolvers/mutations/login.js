
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {checkEmail} from '../../../utils/auth.js'
import { DatabaseError } from '../../../utils/DatabaseError.js';
import { AuthError } from '../../../utils/AuthError.js';

const JWT_SECRET = process.env.JWT_SECRET;


export const loginMutation = async(_,{email,password},{prisma,user})=>{

              if(!checkEmail(email)) throw new AuthError("Invalid email format"); 
     
        try {
            const user = await prisma.user.findUnique({where:{email}})

        if(!user) throw new AuthError("No Such user found")

        const valid = await bcrypt.compare(password,user.password)
        
        if(!valid) throw new AuthError("Invalid Password")
     
        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET)
        
        return token

        } catch (error) {
            if (error instanceof AuthError) {
                throw error
            } 
            else {
            throw new DatabaseError()
            }
        }


    }
  
