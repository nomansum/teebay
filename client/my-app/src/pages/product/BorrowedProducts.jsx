import React, { useContext } from 'react';
import { useQuery } from '@apollo/client/react';
import { Grid, Title, Text, Center } from '@mantine/core';
import ProductCard from '../../components/ProductCard';
import { MY_BORROWED_PRODUCTS } from '../../graphql/query/product';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';

const BorrowedProducts = () => {
  const { token } = useContext(AuthContext);
 

  const { data, loading, error } = useQuery(MY_BORROWED_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  if (loading) return <Center><Text>Loading...</Text></Center>;
  
  if (error) {
    
    ErrorNotification(error.message)
    return <Center><Text>Error loading borrowed products.</Text></Center>;
  }

  if (!data?.myBorrowedProducts?.length) {
    return (
      <Center style={{ minHeight: '60vh' }}>
        <Text size="lg" color="dimmed">
          You haven’t borrowed any products yet.
        </Text>
      </Center>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Title order={2} align="center" mb="xl">
        Borrowed Products
      </Title>
      <Grid justify="center" gutter="xl">
        {data.myBorrowedProducts.map((rental) => (
          <Grid.Col span={4} key={rental.id} style={{ maxWidth: '400px' }}>
            <ProductCard
              product={rental.product}
            //  onView={() => navigate(`/product/${rental.product.id}`)}
             
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default BorrowedProducts;
