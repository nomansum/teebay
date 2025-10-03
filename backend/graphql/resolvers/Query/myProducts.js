import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js";



export const myProducts = async (parent,args,{prisma,user}) => {
     
        
     if(!user) throw new AuthenticationError();

    try {
            return await prisma.product.findMany({
        where: { 
            ownerId: user.id,
            availableForBuy:true

         },
        include: { owner: true }
    })  
} catch (error) {
         throw new DatabaseError()
    }


    }