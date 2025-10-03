


export const addProductToUser = async (parent,args,{prisma,user}) =>{
     
         if(!user) throw new Error("Not Authenticated!")

        try {
            
            const data = await prisma.product.create({
                data:{...args,ownerId:user.id}
            })

            return data

        } catch (error) {
              throw new Error("Something wrong while communicating with DB")
    
        }    

    }