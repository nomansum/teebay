import { AuthenticationError } from "../../../utils/AuthenticationError.js"

import { DatabaseError } from "../../../utils/DatabaseError.js";


export const addProductToUser = async (parent,args,{prisma,user}) =>{
     
         if(!user) throw new AuthenticationError();

        try {
            
            const data = await prisma.product.create({
                data:{...args,ownerId:user.id}
            })

            return data

        } catch (error) {
              throw new DatabaseError()
    
        }    

    }