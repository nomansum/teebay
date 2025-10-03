import { AuthenticationError } from "../../../utils/AuthenticationError.js"


export const rentProductAsUser = async (parent, { id, startDate, endDate }, { prisma, user }) => {
     try {
        if (!user) throw new  AuthenticationError();
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) throw new Error('Product not found');
      if (!product.availableForRent) throw new Error('Not available for rent');
      if (product.ownerId === user.id) throw new Error('Cannot rent your own product');
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) throw new Error('Invalid dates');
     
      const overlapping = await prisma.rental.findMany({
        where: {
          productId: id,
          OR: [
            { startDate: { lt: end }, endDate: { gt: start } },
          ],
        },
      });

      if (overlapping.length > 0) throw new Error('Rent period overlaps with existing rental');
       
      const rental = await prisma.rental.create({
        data: {
          productId: id,
          renterId: user.id,
          startDate: start,
          endDate: end,
        },
        include: { product: true, renter: true },
      }) 

      return rental 
      
     } catch (error) {
      throw error
      
     }  



    }