import React, { useContext, useState } from 'react';
import { Button, Group, Stack, Paper, Title as MantineTitle, TextInput, Textarea, MultiSelect, NumberInput,Select } from '@mantine/core';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { ADD_PRODUCT } from '../../graphql/mutation/product';
import { AuthContext } from '../../context/AuthContext';
import { MY_PRODUCTS } from '../../graphql/query/product';
import { ErrorNotification } from '../../utils/errorNotification';
import { SuccessNotification } from '../../utils/successNotification';
import Messages from '../../constants/messages';

const AddProduct = () => {
   
  const{token} = useContext(AuthContext)  
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    buyPrice: 0,
    price: 0,
    pricingType: 'DAY',
  });

  const [addProduct] = useMutation(ADD_PRODUCT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    refetchQueries: [ { query: MY_PRODUCTS, context: { headers: { authorization: token } } },],
  });


  const navigate = useNavigate();

  const handleNext = () => {
    if (page === 0 && !formData.title) {
      ErrorNotification('Product title is required');
      return;
    }
    if (page === 1 && formData.categories.length === 0) {
      ErrorNotification('At least one category is required');
      return;
    }
    setPage((prev) => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    try {
      await addProduct({ variables: { ...formData, categories: formData.categories || [] } });
       SuccessNotification(Messages.PRODUCT.ADDED_SUCESS);
      navigate('/'); 
    } catch (error) {
      ErrorNotification(error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper p="md">
        {page === 0 && (
          <Stack>
            <MantineTitle order={3}>Basic Info</MantineTitle>
            <TextInput
              label="Product Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Stack>
        )}
        {page === 1 && (
          <Stack>
            <MantineTitle order={3}>Category</MantineTitle>
            <MultiSelect
              data={['ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS']}
              label="Categories"
              value={formData.categories}
              onChange={(value) => setFormData({ ...formData, categories: value })}
              multiple
            />
          </Stack>
        )}
        {page === 2 && (
          <Stack>
            <MantineTitle order={3}>Pricing</MantineTitle>
            <NumberInput
              label="Buy Price"
              value={formData.buyPrice}
              onChange={(value) => setFormData({ ...formData, buyPrice: value || 0 })}
            />
            <NumberInput
              label="Rent Price"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value || 0 })}
            />
            <Select
            data={['DAY', 'HOUR', 'MONTH']}
           label="Pricing Type"
           value={formData.pricingType}
           onChange={(value) => setFormData({ ...formData, pricingType: value })}
              defaultValue="DAY"
                 />
          </Stack>
        )}
        <Group position="apart" mt="md">
          {page > 0 && <Button variant="default" onClick={handlePrevious}>Previous</Button>}
          {page < 2 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </Group>
      </Paper>
    </div>
  );
};

export default AddProduct;

