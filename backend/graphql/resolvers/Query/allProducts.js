import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js"


export const getAllProducts = async (parent,args,{prisma,user})=>{
    
        if(!user) throw new AuthenticationError()
        
      try {
         
        const products = await prisma.product.findMany({
            include:{owner:true}
        })
        
        return products 
      } catch (error) {
        throw new DatabaseError()
      }


    }