import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js";



export const deleteProductOfUser = async(parent,{id},{prisma,user}) =>{
    
        if(!user) throw new AuthenticationError()
        
        try {
            const product = await prisma.product.findUnique({where:{id}});

        if(!product) throw new Error("Product Not Found!")

        if(product.ownerId !== user.id) throw new Error("Not your product to mess with!")

        await prisma.product.delete({where:{id}});

        return true;

        } catch (error) {

         throw new DatabaseError()

        }
      


    }