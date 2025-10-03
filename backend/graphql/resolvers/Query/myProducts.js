

export const myProducts = async (parent,args,{prisma,user}) => {
     
        
     if(!user) throw new Error("Not Authenticated")

    try {
            return await prisma.product.findMany({
        where: { ownerId: user.id },
        include: { owner: true }
    })  
} catch (error) {
        throw new Error("Something wrong while communicating with DB")
    }


    }