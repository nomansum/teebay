import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {checkEmail} from '../../../utils/auth.js'


const JWT_SECRET = process.env.JWT_SECRET;



export const registrationMutation =  async (_, { firstName, lastName, email, address, password,phone },{prisma,user}) => {


      if(!checkEmail(email)) throw new Error("Invalid email format"); 

      const nameRegex = /^[A-Za-z]{2,}$/;
      if (!nameRegex.test(firstName)) {
        throw new Error("First name must contain only letters and be at least 2 characters long");
      }
      
      if (!nameRegex.test(lastName)) {
        throw new Error("Last name must contain only letters and be at least 2 characters long");
      }

      if (/\s/.test(password)) {
        throw new Error("Password cannot contain spaces");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
      if (!bdPhoneRegex.test(phone)) {
        throw new Error("Invalid Bangladeshi phone number");
      }

    
       try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { firstName, lastName, address, email, password: hashedPassword,phone },
      });

      console.log("Registration INSIDE")
      const token = jwt.sign({ id: user.id, email:user.email }, JWT_SECRET);

      return token;
       } catch (error) {
        throw new Error("Something happended while interacting with the database")
       }
     
    }