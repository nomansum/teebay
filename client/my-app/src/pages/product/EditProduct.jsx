import React, { useState, useEffect, useContext } from 'react';
import { Button, Group, Stack, Paper, Title as MantineTitle, TextInput, Textarea, MultiSelect, NumberInput, Select } from '@mantine/core';
import { useMutation, useQuery } from '@apollo/client/react';
import { useParams, useNavigate } from 'react-router-dom';
import { EDIT_PRODUCT } from '../../graphql/mutation/product';
import { MY_PRODUCTS } from '../../graphql/query/product';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';
import Messages from '../../constants/messages';
import { SuccessNotification } from '../../utils/successNotification';

const EditProduct = () => {
  const { id } = useParams();
  const {token} = useContext(AuthContext)

  const { data, loading, error } = useQuery(MY_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });
  const [editProduct] = useMutation(EDIT_PRODUCT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    refetchQueries: [ { query: MY_PRODUCTS, context: { headers: { authorization: token } } }, ],
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    buyPrice: 0,
    price: 0,
    pricingType: 'DAY',
  });

  useEffect(() => {
    if (data && !loading && !error) {
      const product = data.myProducts.find(p => p.id === parseInt(id));
      if (product) {
        setFormData({ ...product, categories: product.categories || [] });
      }
    }
  }, [data, loading, error, id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    ErrorNotification(error.message)
    return <p>Error :(</p>;
  }

  const handleSubmit = async () => {
    if (!formData.title) {
     ErrorNotification(Messages.ERROR.PRODUCT_TITLE);
      return;
    }
    if (formData.categories.length === 0) {
      ErrorNotification(Messages.ERROR.CATEGORY);
      return;
    }
    try {
      await editProduct({ variables: { id: parseInt(id), ...formData, categories: formData.categories || [] } });
      SuccessNotification('Product updated');
      navigate('/');
    } catch (error) {
      ErrorNotification(error.message)
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper p="md">
        <Stack>
          <MantineTitle order={3}>Edit Product</MantineTitle>
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
          <MultiSelect
            data={['ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS']}
            label="Categories"
            value={formData.categories}
            onChange={(value) => setFormData({ ...formData, categories: value })}
            multiple
          />
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
          <Group position="right" mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Stack>
      </Paper>
    </div>
  );
};

export default EditProduct;