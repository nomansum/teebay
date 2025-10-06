import { AuthenticationError } from "../../../utils/AuthenticationError.js"
import { DatabaseError } from "../../../utils/DatabaseError.js";
import { ProductError } from "../../../utils/ProductError.js";



export const buyProductAsUser =  async (_,{id},{prisma,user})=>{
    
        if(!user) throw new AuthenticationError();
        
            try {

     const product = await prisma.product.findUnique({ where: { id } });

      if (!product) throw new ProductError('Product not found');

      if (!product.availableForBuy) throw new ProductError('Not available for buy');

      if (product.ownerId === user.id) throw new ProductError('Cannot buy your own product');

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
                if (error instanceof ProductError) {
                             throw error
                         } 
                         else {
                         throw new DatabaseError()
                         }
            }



    }