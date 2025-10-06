import React, { useState, useEffect, useContext } from 'react';
import { Button, Group, Stack, Paper, Title as MantineTitle, TextInput, Modal, Text } from '@mantine/core';
import { useMutation, useQuery } from '@apollo/client/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MY_BORROWED_PRODUCTS, MY_LENT_PRODUCTS, MY_PRODUCTS } from '../../graphql/query/product';
import { BUY_PRODUCT, RENT_PRODUCT } from '../../graphql/mutation/product';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../../utils/errorNotification';
import { SuccessNotification } from '../../utils/successNotification';

const ProductDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(state?.product || null);
  const [openedBuy, setOpenedBuy] = useState(false);
  const [openedRent, setOpenedRent] = useState(false);
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');

  const { data, loading, error } = useQuery(MY_PRODUCTS, {
    context: { headers: { authorization: token } },
    skip: !!state?.product, 
  });

  const [buyProduct] = useMutation(BUY_PRODUCT, {
    context: { headers: { authorization: token } },
    refetchQueries: [{ query: MY_PRODUCTS, context: { headers: { authorization: token } } },],
  });

  const [rentProduct] = useMutation(RENT_PRODUCT, {
    context: { headers: { authorization: token } },
    refetchQueries: [{ query: MY_PRODUCTS, context: { headers: { authorization: token } } },{ query: MY_LENT_PRODUCTS, context: { headers: { authorization: token } } },

      { query: MY_BORROWED_PRODUCTS, context: { headers: { authorization: token } } }
    ],
  });

  useEffect(() => {
    if (!state?.product && data && !loading && !error) {
      const foundProduct = data.myProducts.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [state?.product, data, loading, error, id]);

  if (loading && !product) return <p>Loading...</p>;
  if (error) {
    ErrorNotification(error.message);
    return <p>Error :(</p>;
  }

  if (!product) return <p>Product not found</p>;

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleBuy = async () => {
    try {
      await buyProduct({ variables: { id: parseInt(id) } });
      SuccessNotification('Product bought');
      setOpenedBuy(false);
      navigate('/');
    } catch (error) {
      ErrorNotification( error.message);
    }
  };

  const handleRent = async () => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(rentStart) || !dateRegex.test(rentEnd)) {
      ErrorNotification('Please enter dates in dd/mm/yyyy format');
      return;
    }
    const startDate = parseDate(rentStart);
    const endDate = parseDate(rentEnd);
    if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
       ErrorNotification('Invalid rental period');
      return;
    }
    try {
      await rentProduct({ variables: { id: parseInt(id), startDate: startDate.toISOString(), endDate: endDate.toISOString() } });
      SuccessNotification('Product rented');
      setOpenedRent(false);
      navigate('/');
    } catch (error) {
      ErrorNotification(error.message);
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper p="md" withBorder shadow="md" style={{ maxWidth: '600px', width: '100%' }}>
        <Stack>
          <MantineTitle order={2} align="center">{product.title}</MantineTitle>
          <Text align="center" weight={500}>Categories: {product.categories.join(', ')}</Text>
          <Text align="center">Description: {product.description}</Text>
          <Text align="center">Buy Price: ${product.buyPrice || 0}</Text>
          <Text align="center">Rent Price: ${product.price || 0} per {product.pricingType || 'N/A'}</Text>
          <Group position="center" spacing="md">
            <Button color="blue" onClick={() => setOpenedRent(true)}>Rent</Button>
            <Button color="green" onClick={() => setOpenedBuy(true)}>Buy</Button>
          </Group>
        </Stack>
      </Paper>

 
      <Modal opened={openedBuy} onClose={() => setOpenedBuy(false)} title="Confirm Purchase" centered>
        <Text>Are you sure you want to buy this product?</Text>
        <Group position="right" mt="md">
          <Button variant="default" color="red" onClick={() => setOpenedBuy(false)}>No</Button>
          <Button color="violet" onClick={handleBuy}>Yes</Button>
        </Group>
      </Modal>

    
      <Modal opened={openedRent} onClose={() => setOpenedRent(false)} title="Rental Period" centered>
        <Stack>
          <TextInput label="From (dd/mm/yyyy)" value={rentStart} onChange={(e) => setRentStart(e.target.value)} />
          <TextInput label="To (dd/mm/yyyy)" value={rentEnd} onChange={(e) => setRentEnd(e.target.value)} />
          <Group position="right" mt="md">
            <Button variant="default" color="red" onClick={() => setOpenedRent(false)}>Go Back</Button>
            <Button color="violet" onClick={handleRent}>Confirm</Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
};

export default ProductDetail;
