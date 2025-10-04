export const validateRegister = (values) => {
  const errors = {};
  if (!values.firstName) errors.firstName = 'Required';
  if (!values.lastName) errors.lastName = 'Required';
  if (!values.email) errors.email = 'Required';

  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email';
  
  if (!values.password) errors.password = 'Required';
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match';

   const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
      if (values.phone && !bdPhoneRegex.test(values.phone)) {
         errors.phone = 'Invalid phone number';
      }


  return errors;
};