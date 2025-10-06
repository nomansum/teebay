import { useForm } from '@mantine/form';
import { useMutation } from "@apollo/client/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { REGISTER } from '../graphql/mutation/authMutations';
import { validateRegister } from '../utils/validators';
import Messages from '../constants/messages';
import { ErrorNotification } from '../utils/errorNotification';
import { SuccessNotification } from '../utils/successNotification';
 const useRegistration = () =>{
     
   const {token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
   useEffect(() => {
          if (token) {
            navigate('/dashboard');
          }
        }, [token, navigate]);

const [mutationFunction,{loading}]  = useMutation(REGISTER);

  const form = useForm({
     initialValues: { 
    firstName: '', lastName: '', address: '', 
    email: '', phone: '', password: '', confirmPassword: '' 
  },
    validate:validateRegister,
  });
     


  const handleSubmit = async (values) => {
    try {

        const { confirmPassword, ...input } = values;
      const { data } = await mutationFunction({ variables:input });
      const token =  data.register;

      setToken(token);
      
      SuccessNotification(Messages.SUCCESS.SIGNUP);

      setTimeout(() => navigate('/dashboard'), 100); 

      navigate('/dashboard');
    } catch (error) {
     ErrorNotification(error.message);
    }
  };
 
return {form,handleSubmit,loading};



}

export default useRegistration;