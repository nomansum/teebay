import React, { useContext } from 'react';
import { useQuery } from '@apollo/client/react';
import { Grid, Title, Text } from '@mantine/core';
import ProductCard from '../../components/ProductCard';
import { ALL_PRODUCTS } from '../../graphql/query/product';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';

const AllProducts = () => {
    const {token} = useContext(AuthContext)
  const { data, loading, error } = useQuery(ALL_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) {
    ErrorNotification(error.message)
    return <p>Error :(</p>;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Title order={2} align="center" mb="xl">All Products</Title>
      <Grid justify="center" gutter="xl">
        {data.allProducts.map((product) => (
          <Grid.Col span={4} key={product.id} style={{ maxWidth: '400px' }}>
            <ProductCard
              product={product}
              onView={() => navigate(`/product/${product.id}`, { state: { product } })}
              extraInfo={product.owner ? `Owner: ${product.owner.email}` : 'No owner'}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;

