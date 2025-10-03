import jwt  from 'jsonwebtoken'
export const getUserFromToken = (token)=>{

  try {
    if (token) {
      return  jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }


 }


 export const checkEmail = (email)=>{

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return false
      }

  return true

 }