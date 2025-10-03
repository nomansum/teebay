
import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js";



export const getOwnLentProducts =  async (parent,args,{prisma,user})=>{
    
        if(!user) throw new AuthenticationError()
        try {
            const rentals = await prisma.rental.findMany({
        where: { product: { ownerId: user.id } },
        include: { product: true, renter: true },
      });
            return rentals

        } catch (error) {
                    throw new DatabaseError()

        }     
        

    }