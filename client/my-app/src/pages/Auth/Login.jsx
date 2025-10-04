import React, { useContext } from 'react';
import { useMutation } from '@apollo/client/react';
import { TextInput, PasswordInput, Button, Paper, Anchor, Stack } from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../graphql/mutation/authMutations';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm';


const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [login, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const { data: result } = await login({ variables: data });
      setToken(result.login);
      console.log(result.login)
      navigate('/');
    } catch (error) {
      alert(error.message); // Replace with notification library if added
    }
  };

  return <AuthForm title="SIGN IN" onSubmit={handleSubmit} isLogin={true} linkText="Don't have an account? Sign up" linkTo="/register" />;
};

export default Login;
// const Login = () => {
//   const { setToken } = useContext(AuthContext);
//   const [login, { loading }] = useMutation(LOGIN);
//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: { email: '', password: '' },
//     validate: {
//       email: (value) => (value ? null : 'Required'),
//       password: (value) => (value ? null : 'Required'),
//     },
//   });

//   const handleSubmit = async (values) => {
//     try {
//       const { data } = await login({ variables: values });
//       setToken(data.login);
//       showNotification({ message: "Login Successful", color: 'green' });
//       navigate('/');
//     } catch (error) {
//       showNotification({ title: 'error', message: error.message, color: 'red' });
//     }
//   };

//   return (
//     <div className="login-container">
//       <Paper shadow="sm" p="xl" className="login-card">
//         <Stack align="center" spacing="sm">
//           <h2 className="login-title">SIGN IN</h2>
//           <form onSubmit={form.onSubmit(handleSubmit)} className="login-form">
//             <TextInput
//               placeholder="Email"
//               {...form.getInputProps('email')}
//               className="login-input"
//             />
//             <PasswordInput
//               placeholder="Password"
//               {...form.getInputProps('password')}
//               mt="md"
//               className="login-input"
//             />
//             <Button type="submit" fullWidth mt="md" loading={loading} className="login-btn">
//               LOGIN
//             </Button>
//           </form>
//           <div className="login-footer">
//             Don’t have an account?{' '}
//             <Anchor href="/register" className="signup-link">
//               Signup
//             </Anchor>
//           </div>
//         </Stack>
//       </Paper>
//     </div>
//   );
// };

// export default Login;
