import React from 'react';
import { TextInput, PasswordInput, Button, Paper, Anchor, Stack, Title, Box, Center, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = () => {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (value ? null : 'Required'),
      password: (value) => (value ? null : 'Required'),
    },
  });

  const onSubmit = (values) => {
    // placeholder; hook your mutation here
    console.log('login', values);
  };

  return (
    <Center h="100vh" bg="#f8fbff">
      <Stack align="center" gap={24}>
        <Title order={3} fw={600} c="#2c3e50" style={{ letterSpacing: 1 }}>SIGN IN</Title>

        <Paper withBorder shadow="xs" radius="sm" p="lg" style={{ width: 420, borderColor: '#e7eef6' }}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                placeholder="Email"
                size="sm"
                radius="xs"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                placeholder="Password"
                size="sm"
                radius="xs"
                {...form.getInputProps('password')}
              />

              <Group justify="center" mt="xs">
                <Button
                  type="submit"
                  size="xs"
                  radius="xs"
                  styles={{
                    root: {
                      background: 'linear-gradient(180deg, #8a00ff 0%, #5a00ff 100%)',
                    },
                  }}
                >
                  LOGIN
                </Button>
              </Group>
            </Stack>
          </form>

          <Box ta="center" mt="sm" c="#7d8ca1" fz="sm">
            Don't have an account?{' '}
            <Anchor href="/register" size="sm">Signup</Anchor>
          </Box>
        </Paper>
      </Stack>
    </Center>
  );
};

export default Login;
