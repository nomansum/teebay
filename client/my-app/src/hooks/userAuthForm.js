import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useMutation } from "@apollo/client/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useAuthForm = ({
    mutation,
    initialValues,
    validate,
    transformValues =(v)=>v
}) =>{
     
   const {token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
const [mutationFunction,{loading}]  = useMutation(mutation);

  const form = useForm({
     initialValues,
    validate,
  });
      useEffect(() => {
          if (token) {
            navigate('/dashboard');
          }
        }, [token, navigate]);


  const handleSubmit = async (values) => {
    try {
        const variables = transformValues(values);
      const { data } = await mutationFunction({ variables });
      const token = data.login || data.register;
      setToken(token);
      
      showNotification({ message: 'Login successful', color: 'green' });
      navigate('/dashboard');
    } catch (error) {
      showNotification({ title: 'Error', message: error.message, color: 'red' });
    }
  };
 
return {form,handleSubmit,loading};



}