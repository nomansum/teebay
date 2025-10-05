import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { Button, Modal, Grid, Title, Group, Text, Stack, Paper, Title as MantineTitle, MultiSelect, NumberInput, TextInput, Textarea } from '@mantine/core';
import ProductCard from '../../components/ProductCard';
import { MY_PRODUCTS } from '../../graphql/query/product';
import {  DELETE_PRODUCT } from '../../graphql/mutation/product';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';
import { SuccessNotification } from '../../utils/successNotification';


const MyProducts = () => {
    const {token} = useContext(AuthContext)

  const { data, loading, error, refetch } = useQuery(MY_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    update(cache, { data: { deleteProduct } }) {
      if (deleteProduct) {
        cache.evict({ id: cache.identify({ __typename: 'Product', id: selectedProduct.id }) });
        cache.gc();
      }
    },
    refetchQueries: [
      { query: MY_PRODUCTS, context: { headers: { authorization: token } } },
    ],
  });


  const [openedDelete, setOpenedDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) {
    ErrorNotification(error.message);
    return <p>Error :(</p>;
  }

  const handleDelete = async () => {
    try {
      await deleteProduct({ variables: { id: selectedProduct.id } });
      SuccessNotification('Product deleted');
      setOpenedDelete(false);
      await refetch({ context: { headers: { authorization: localStorage.getItem('token') || '' } } });
    } catch (error) {
      ErrorNotification(error.message);
    }
  };

  const openDelete = (product) => {
    setSelectedProduct(product);
    setOpenedDelete(true);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Title order={2} align="center" mb="xl">My Products</Title>
      <Grid justify="center" gutter="xl">
        {data.myProducts.map((product) => (
          <Grid.Col span={4} key={product.id} style={{ maxWidth: '400px' }}>
            <ProductCard product={product} onEdit={() => navigate(`/edit/${product.id}`)} onDelete={() => openDelete(product)} onView={() => navigate(`/product/${product.id}`)} />
          </Grid.Col>
        ))}
      </Grid>

      <Button
        onClick={() => navigate('/add-product')}
        size="md"
        color="blue"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}
      >
        Add Product
      </Button>

      <Modal opened={openedDelete} onClose={() => setOpenedDelete(false)} title="Delete Product" centered>
        <Text>Are you sure you want to delete this product?</Text>
        <Group position="right" mt="md">
          <Button variant="default" onClick={() => setOpenedDelete(false)}>No</Button>
          <Button color="red" onClick={handleDelete}>Yes</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default MyProducts;
