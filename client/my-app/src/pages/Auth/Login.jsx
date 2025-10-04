import React from 'react';
import { TextInput, PasswordInput, Button, Paper, Anchor, Stack, Group, Text } from '@mantine/core';
import { LOGIN } from '../../graphql/mutation/authMutations';
import { AuthContext } from '../../context/AuthContext';
import { useAuthForm } from '../../hooks/userAuthForm';

const Login = () => {

  const {form,handleSubmit,loading} = useAuthForm({
    mutation: LOGIN,
  initialValues: { email: "", password: "" },
  validate: {
    email: (v) => (v ? null : "Required"),
    password: (v) => (v ? null : "Required"),
  },
  })
    

  return (
    <Paper shadow="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
      <Stack>
        <h2>SIGN IN</h2>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Email" {...form.getInputProps('email')} />
          <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
          <Button type="submit" fullWidth mt="md" loading={loading}>LOGIN</Button>
        </form>

        {/* 🔹 Styled "Don't have an account?" */}
        <Group position="center" mt="sm">
          <Text size="sm" color="black">
            Don&apos;t have an account?{' '}
            <Anchor href="/register" size="sm" underline>
              Sign up
            </Anchor>
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default Login;












// import React, { useContext } from 'react';
// import { useMutation } from '@apollo/client/react';
// import { TextInput, PasswordInput, Button, Paper, Anchor, Stack } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { showNotification } from '@mantine/notifications';
// import { useNavigate } from 'react-router-dom';
// import { LOGIN } from '../../graphql/mutation/authMutations';
// import { AuthContext } from '../../context/AuthContext';


// const Login = () => {
//   const { setToken } = useContext(AuthContext);
//   const [login, { loading }] = useMutation(LOGIN);
//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: { email: '', password: '' },
//     validate: {
//       email: (value) => value ? null : 'Required',
//       password: (value) => value ? null : 'Required',
//     },
//   });

//   const handleSubmit = async (values) => {
//     try {
//       const { data } = await login({ variables: values });
//       setToken(data.login);
//       console.log(data.login)
//       showNotification({ message: 'Login successful', color: 'green' });
//       navigate('/dashboard');
//     } catch (error) {
//       showNotification({ title: 'Error', message: error.message, color: 'red' });
//     }
//   };

//   return (
//     <Paper shadow="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
//       <Stack>
//         <h2>SIGN IN</h2>
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <TextInput label="Email" {...form.getInputProps('email')} />
//           <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
//           <Button type="submit" fullWidth mt="md" loading={loading}>LOGIN</Button>
//         </form>
//         <Anchor href="/register" underline>Don't have an account? Sign up</Anchor>
//       </Stack>
//     </Paper>
//   );
// };

// export default Login;

















// import React, { useContext } from 'react';
// import {
//   Container,
//   Card,
//   TextInput,
//   Group,
//   Button,
//   PasswordInput,
//   Title,
//   Text,
//   Anchor,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { showNotification } from '@mantine/notifications';
// import { useMutation } from '@apollo/client';
// import { useNavigate } from 'react-router-dom';
// import { LOGIN } from '../../graphql/mutation/authMutations';
// import { AuthContext } from '../../context/AuthContext';

// const Login = () => {
//   const { setToken } = useContext(AuthContext);
//   const [login, { loading }] = useMutation(LOGIN);
//   const navigate = useNavigate();

//   const loginForm = useForm({
//     initialValues: { email: '', password: '' },
//     validate: {
//       email: (value) => (value ? null : 'Required'),
//       password: (value) => (value ? null : 'Required'),
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ variables: loginForm.values });
//       setToken(data.login);
//       showNotification({ message: 'Login successful', color: 'green' });
//       navigate('/dashboard');
//     } catch (error) {
//       showNotification({ title: 'Error', message: error.message, color: 'red' });
//     }
//   };

//   return (
//     <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Card shadow="sm" padding="lg" withBorder style={{ width: 400 }}>
//         <Title align="center" order={2}>
//           SIGN IN
//         </Title>
//         <form onSubmit={handleSubmit}>
//           <TextInput
//             mt={30}
//             required
//             placeholder="Email"
//             {...loginForm.getInputProps('email')}
//           />
//           <PasswordInput
//             mt={15}
//             required
//             placeholder="Password"
//             {...loginForm.getInputProps('password')}
//           />
//           <Group position="center" mt="xl">
//             <Button type="submit" color="violet" loading={loading}>
//               LOGIN
//             </Button>
//           </Group>
//         </form>

//         <Text align="center" mt="md">
//           Don't have an account?{' '}
//           <Anchor href="/auth/registration" fz="md" fw="bold">
//             Signup
//           </Anchor>
//         </Text>
//       </Card>
//     </Container>
//   );
// };

// export default Login;























