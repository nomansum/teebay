import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useMutation } from "@apollo/client/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { REGISTER } from '../graphql/mutation/authMutations';
import { validateRegister } from '../utils/validators';

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
      
      showNotification({ message: 'Registration successful', color: 'green' });

      setTimeout(() => navigate('/dashboard'), 100); 

      navigate('/dashboard');
    } catch (error) {
      showNotification({ title: 'Error', message: error.message, color: 'red' });
    }
  };
 
return {form,handleSubmit,loading};



}

export default useRegistration;