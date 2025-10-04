import React,{useContext} from "react";
import { useMutation } from "@apollo/client/react";
import { TextInput, PasswordInput, Button, Paper, Anchor, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from "../../graphql/mutation/authMutations";
import { AuthContext } from "../../context/AuthContext";
import { validateRegister } from "../../utils/validators";
import AuthForm from "../../components/AuthForm";

const Register = () => {
  const { setToken } = useContext(AuthContext);
  const [register, { loading }] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const { confirmPassword, ...input } = data;
    try {
      const { data: result } = await register({ variables: input });
      setToken(result.register);
      navigate('/');
    } catch (error) {
      alert(error.message); // Replace with notification library if added
    }
  };

  return <AuthForm title="SIGN UP" onSubmit={handleSubmit} isLogin={false} linkText="Already have an account? Sign in" linkTo="/login" />;
};

export default Register;

// const  Register = () => {

//   const {setToken} = useContext(AuthContext);
//   const [register,{loading}] = useMutation(REGISTER);
//   const navigate = useNavigate();

//   const form = useForm({
//    initialValues: { 
//     firstName: '',
//      lastName: '', 
//      address: '',
//       email: '', 
//       phone: '',
//        password: '',
//         confirmPassword: '' 
//     },
//     validate: validateRegister,
//   });

// const handleSubmit = async (values) => {
//     const {confirmPassword,...input} = values;
//     try {
//         const { data } = await register({ variables: input });
//       setToken(data.register);
//       showNotification({ message: 'Registration successful', color: 'green' });
//       navigate('/');
//     } catch (error) {
//         showNotification({ title: 'Error', message: error.message, color: 'red' });
//     }
// }



//   return (
//     <Paper shadow="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
//       <Stack>
//         <h2>SIGN UP</h2>
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Group grow>
//             <TextInput label="First Name" {...form.getInputProps('firstname')} />
//             <TextInput label="Last Name" {...form.getInputProps('lastname')} />
//           </Group>
//           <TextInput label="Address" {...form.getInputProps('address')} mt="md" />
//           <TextInput label="Phone Number" {...form.getInputProps('phoneNumber')} mt="md" />
//           <TextInput label="Email" {...form.getInputProps('email')} mt="md" />
//           <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
//           <PasswordInput label="Confirm Password" {...form.getInputProps('confirmPassword')} mt="md" />
//           <Button type="submit" fullWidth mt="md" loading={loading}>REGISTER</Button>
//         </form>
//         <Anchor href="/login" underline>Already have an account? Sign in</Anchor>
//       </Stack>
//     </Paper>
//   );
// }

// export default Register
