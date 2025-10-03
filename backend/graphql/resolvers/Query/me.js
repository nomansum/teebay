

export const meQuery = async(_,__,{prisma,user})=>{
            if(!user) throw new Error("Not Authenticated");
            try{
                const userdata = await prisma.user.findUnique({where:{id:user.id}});
              return userdata
            }
            catch(e){
                throw new Error("Could not find user");
            }
        }