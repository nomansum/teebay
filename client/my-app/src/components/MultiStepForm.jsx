import React, { useState } from 'react';
import { Stepper, Button, Group, TextInput, MultiSelect, NumberInput, Textarea, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

const MultiStepProductForm = ({ initialValues = {}, onSubmit, isEdit = false }) => {
  const [active, setActive] = useState(0);
  const form = useForm({
    initialValues: {
      name: initialValues.name || '',
      description: initialValues.description || '',
      categories: initialValues.categories || [],
      buyPrice: initialValues.buyPrice || 0,
      price: initialValues.price || 0,
      pricingType: initialValues.pricingType || 'DAY',
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Required'),
      categories: (value) => (value.length > 0 ? null : 'Select at least one category'),
    },
  });

  const nextStep = () => setActive((current) => (form.validate() ? (current < 3 ? current + 1 : current) : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Paper p="md">
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Basic Info" description="Product name and description">
          <TextInput label="Title" {...form.getInputProps('name')} />
          <Textarea label="Description" {...form.getInputProps('description')} mt="md" />
        </Stepper.Step>
        <Stepper.Step label="Category" description="Select categories">
          <MultiSelect
            data={['ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS']}
            label="Category"
            {...form.getInputProps('categories')}
          />
        </Stepper.Step>
        <Stepper.Step label="Pricing" description="Set prices">
          <NumberInput label="Price" {...form.getInputProps('buyPrice')} />
          <NumberInput label="Rent" {...form.getInputProps('price')} mt="md" />
          <MultiSelect
            data={['DAY', 'HOUR', 'MONTH']}
            label="Per"
            {...form.getInputProps('pricingType')}
            maxSelectedValues={1}
            mt="md"
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to edit.
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {active > 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active < 3 && <Button onClick={nextStep}>Next</Button>}
        {active === 3 && <Button onClick={() => onSubmit(form.values)}>{isEdit ? 'Update Product' : 'Add Product'}</Button>}
      </Group>
    </Paper>
  );
};

export default MultiStepProductForm;