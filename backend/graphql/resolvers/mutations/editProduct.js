import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js"



export const editProductOfUser = async (parent,{id,...updates},{prisma,user})=>{
    
        if(!user) throw new AuthenticationError()
        
        try {
             const product = await prisma.product.findUnique({where:{id}})  
         
         if(!product) throw new Error("Product Not Found")

        if(product.ownerId!==user.id) throw new Error("Not your product to mess with")

       const updatedProduct = await prisma.product.update({
        where:{id},
        data:updates,
        include:{owner:true}
       })
       return updatedProduct;

        } catch (error) {
        
            throw new DatabaseError()

        }

    }
