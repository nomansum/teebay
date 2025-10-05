import { TextInput, PasswordInput, Button, Paper, Anchor, Stack, Group, Text } from '@mantine/core';

import useLogin from '../../hooks/useLogin';

const Login = () => {

  const {form,handleSubmit,loading} = useLogin()
    

  return (
    <Paper shadow="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
      <Stack>
        <h2>SIGN IN</h2>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Email" {...form.getInputProps('email')} />
          <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
          <Button type="submit" fullWidth mt="md" loading={loading}>LOGIN</Button>
        </form>

        
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









































