import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js";



export const buyProductAsUser =  async (_,{id},{prisma,user})=>{
    
        if(!user) throw new AuthenticationError();
        
            try {

     const product = await prisma.product.findUnique({ where: { id } });

      if (!product) throw new Error('Product not found');

      if (!product.availableForBuy) throw new Error('Not available for buy');

      if (product.ownerId === user.id) throw new Error('Cannot buy your own product');

      const purchase = await prisma.purchase.create({
        data: {
          productId: id,
          sellerId: product.ownerId,
          buyerId: user.id,
        },
        include: { product: true, seller: true, buyer: true },
      });

      await prisma.product.update({
        where: { id },
        data: { ownerId: user.id, availableForBuy: false, availableForRent: false }, 
      });
      
      return purchase;

               
                
            } catch (error) {
             throw new DatabaseError()
            }



    }