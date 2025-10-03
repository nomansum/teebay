import { AuthenticationError } from "../../../utils/AuthenticationError.js"


export const getAllProducts = async (parent,args,{prisma,user})=>{
    
        if(!user) throw new AuthenticationError()
        
      try {
         
        const products = await prisma.product.findMany({
            include:{owner:true}
        })
        
        return products 
      } catch (error) {
        throw new Error("Error communicating with DB")
      }


    }