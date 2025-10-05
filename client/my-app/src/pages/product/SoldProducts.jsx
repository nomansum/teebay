import React, { useContext } from 'react';
import { useQuery } from '@apollo/client/react';
import { Grid, Title, Text, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { MY_SOLD_PRODUCTS } from '../../graphql/query/product';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';

const SoldProducts = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(MY_SOLD_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  if (loading) return <Center><Text>Loading...</Text></Center>;

  if (error) {
    console.error('GraphQL error:', error);
    ErrorNotification( error.message);
    return <Center><Text>Error loading sold products.</Text></Center>;
  }

  if (!data?.mySoldProducts?.length) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        <Text size="lg" color="dimmed">
          You haven’t sold any products yet.
        </Text>
      </Center>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Title order={2} align="center" mb="xl">Sold Products</Title>
      <Grid justify="center" gutter="xl">
        {data.mySoldProducts.map((sale) => (
          <Grid.Col span={4} key={sale.id} style={{ maxWidth: '400px' }}>
            <ProductCard
              product={sale.product}
              onView={() => navigate(`/product/${sale.product.id}`)}
              extraInfo={`Sold to: ${sale.buyer.email} on ${new Date(sale.date).toLocaleDateString()}`}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default SoldProducts;
