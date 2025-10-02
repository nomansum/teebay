import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const meQuery = async(_,__,{id})=>{
            if(!id) throw new Error("Not Authenticated");
            try{
              return prisma.user.findUnique({where:{id:id}});
            }
            catch(e){
                throw new Error("Could not find user");
            }
        }