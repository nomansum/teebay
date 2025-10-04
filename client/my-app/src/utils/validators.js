export const validateRegister = (values) => {
  const errors = {};
  if (!values.firstName) errors.firstname = 'Required';
  if (!values.lastName) errors.lastname = 'Required';
  if (!values.email) errors.email = 'Required';

  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email';
  
  if (!values.password) errors.password = 'Required';
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match';


  if (values.phone && !/^\+?[1-9]\d{1,14}$/.test(values.phone)) errors.phone = 'Invalid phone number';
  return errors;
};