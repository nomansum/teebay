import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js"



export const getOwnBoughtProducts =  async (parent,args,{prisma,user})=>{
    
        if(!user) throw new AuthenticationError()
        try {
            const purchases = await prisma.purchase.findMany(
                {
                
                    where: {
                        buyerId:user.id
                    },
                    include:{
                        product:true,
                        seller:true,
                        buyer:true
                    }

                }
            )
            return purchases

        } catch (error) {
                  throw new DatabaseError()

        }     
        

    }