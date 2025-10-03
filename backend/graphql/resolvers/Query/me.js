import { AuthenticationError } from "../../../utils/AuthenticationError.js";


export const meQuery = async(_,__,{prisma,user})=>{
            if(!user) throw new AuthenticationError();
            try{
                const userdata = await prisma.user.findUnique({where:{id:user.id}});
              return userdata
            }
            catch(e){
                throw new Error("Could not find user");
            }
        }