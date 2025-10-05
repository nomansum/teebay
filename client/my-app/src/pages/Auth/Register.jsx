import React from "react";
import { TextInput, PasswordInput, Button, Paper, Anchor, Stack, Group, Text } from '@mantine/core';
import { REGISTER } from "../../graphql/mutation/authMutations";
import { AuthContext } from "../../context/AuthContext";
import { validateRegister } from "../../utils/validators";
import { useAuthForm } from "../../hooks/userAuthForm";

const Register = () => {
const { form, handleSubmit, loading } = useAuthForm({
  mutation: REGISTER,
  initialValues: { 
    firstName: '', lastName: '', address: '', 
    email: '', phone: '', password: '', confirmPassword: '' 
  },
  validate: validateRegister,
  transformValues: (values) => {
    const { confirmPassword, ...input } = values;
    return input; 
  },
});

  return (
    <Paper shadow="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
      <Stack>
        <h2>SIGN UP</h2>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow>
            <TextInput label="First Name" {...form.getInputProps('firstName')} />
            <TextInput label="Last Name" {...form.getInputProps('lastName')} />
          </Group>
          <TextInput label="Address" {...form.getInputProps('address')} mt="md" />
          <TextInput label="Phone Number" {...form.getInputProps('phone')} mt="md" />
          <TextInput label="Email" {...form.getInputProps('email')} mt="md" />
          <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
          <PasswordInput label="Confirm Password" {...form.getInputProps('confirmPassword')} mt="md" />
          <Button type="submit" fullWidth mt="md" loading={loading}>REGISTER</Button>
        </form>

       
        <Group position="center" mt="sm">
          <Text size="sm" color="black">
            Already have an account?{' '}
            <Anchor href="/" size="sm" underline>
              Sign in
            </Anchor>
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}

export default Register;

