import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useMutation } from "@apollo/client/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LOGIN } from '../graphql/mutation/authMutations';

 const useLogin = () =>{
   const {token, setToken } = useContext(AuthContext);
     const navigate = useNavigate();
     useEffect(() => {
          if (token) {
            navigate('/dashboard');
          }
        }, [token, navigate]);

const [mutationFunction,{loading}]  = useMutation(LOGIN);

  const form = useForm({
     initialValues:{ email: "", password: "" },
    validate:{
    email: (v) => (v ? null : "Required"),
    password: (v) => (v ? null : "Required"),
  },
  });
     


  const handleSubmit = async (values) => {
    try {
        
      const { data } = await mutationFunction({ variables:values });
      const token = data.login;
      setToken(token);
      
      showNotification({ message: 'Login successful', color: 'green' });
      navigate('/dashboard');
    } catch (error) {
      showNotification({ title: 'Error', message: error.message, color: 'red' });
    }
  };
 
return {form,handleSubmit,loading};



}

export default useLogin;