import React, { useContext } from 'react';
import { useQuery } from '@apollo/client/react';
import { Button, Grid, Title, Text } from '@mantine/core';
import ProductCard from '../../components/ProductCard';
import { MY_LENT_PRODUCTS } from '../../graphql/query/product';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';

const LentProducts = () => {
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useQuery(MY_LENT_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    ErrorNotification(error.message);
    return <p>Error :(</p>;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Title order={2} align="center" mb="xl">Lent Products</Title>
      <Grid justify="center" gutter="xl">
        {data.myLentProducts.map(({product}) => (
          <Grid.Col span={4} key={product.id} style={{ maxWidth: '400px' }}>
              <ProductCard
              product={product}
             // onView={() => navigate(`/product/${product.id}`, { state: { product } })}
              
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default LentProducts;