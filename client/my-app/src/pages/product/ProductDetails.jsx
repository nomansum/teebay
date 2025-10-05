import React, { useState, useEffect, useContext } from 'react';
import { Button, Group, Stack, Paper, Title as MantineTitle, TextInput, Textarea, MultiSelect, NumberInput, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation, useQuery } from '@apollo/client/react';
import { useParams, useNavigate } from 'react-router-dom';
import { MY_PRODUCTS } from '../../graphql/query/product';
import {  BUY_PRODUCT, EDIT_PRODUCT, RENT_PRODUCT } from '../../graphql/mutation/product';
import { AuthContext } from '../../context/AuthContext';
import { DatePicker } from '@mantine/dates';
import { Text } from '@mantine/core';


const ProductDetail = () => {
  const { id } = useParams();
  const {token} = useContext(AuthContext);

  const { data, loading, error } = useQuery(MY_PRODUCTS, {
    context: {
      headers: {
        authorization: token,
      },
    },
  });
  const [buyProduct] = useMutation(BUY_PRODUCT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    refetchQueries: [
         { query: MY_PRODUCTS, context: { headers: { authorization: token } } },
    ],
  });
  const [rentProduct] = useMutation(RENT_PRODUCT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    refetchQueries: [
         { query: MY_PRODUCTS, context: { headers: { authorization: token } } },
    ],
  });

      
  const navigate = useNavigate();

    const [product, setProduct] = useState(null);
  const [openedBuy, setOpenedBuy] = useState(false);
  const [openedRent, setOpenedRent] = useState(false);
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');

  useEffect(() => {
    if (data && !loading && !error) {
      const foundProduct = data.myProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [data, loading, error, id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    showNotification({ message: error.message, color: 'red' });
    return <p>Error :(</p>;
  }

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleBuy = async () => {
    try {
      await buyProduct({ variables: { id: parseInt(id) } });
      showNotification({ message: 'Product bought', color: 'green' });
      setOpenedBuy(false);
      navigate('/');
    } catch (error) {
      showNotification({ message: error.message, color: 'red' });
    }
  };

  const handleRent = async () => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(rentStart) || !dateRegex.test(rentEnd)) {
      showNotification({ message: 'Please enter dates in dd/mm/yyyy format', color: 'red' });
      return;
    }
    const startDate = parseDate(rentStart);
    const endDate = parseDate(rentEnd);
    if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
      showNotification({ message: 'Invalid rental period: End date must be after start date', color: 'red' });
      return;
    }
    try {
      await rentProduct({ variables: { id: parseInt(id), startDate: startDate.toISOString(), endDate: endDate.toISOString() } });
      showNotification({ message: 'Product rented', color: 'green' });
      setOpenedRent(false);
      navigate('/');
    } catch (error) {
      showNotification({ message: error.message, color: 'red' });
    }
  };

  if (!product) return <p>Product not found</p>;

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
          <TextInput
            label="From (dd/mm/yyyy)"
            value={rentStart}
            onChange={(e) => setRentStart(e.target.value)}
            placeholder="e.g., 05/10/2025"
          />
          <TextInput
            label="To (dd/mm/yyyy)"
            value={rentEnd}
            onChange={(e) => setRentEnd(e.target.value)}
            placeholder="e.g., 10/10/2025"
          />
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




// import React, { useState, useEffect, useContext } from 'react';
// import { Button, Group, Stack, Paper, Title as MantineTitle, TextInput, Textarea, MultiSelect, NumberInput, Modal } from '@mantine/core';
// import { showNotification } from '@mantine/notifications';
// import { useMutation, useQuery } from '@apollo/client/react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MY_PRODUCTS } from '../../graphql/query/product';
// import {  BUY_PRODUCT, EDIT_PRODUCT, RENT_PRODUCT } from '../../graphql/mutation/product';
// import { AuthContext } from '../../context/AuthContext';
// import { DatePicker } from '@mantine/dates';
// import { Text } from '@mantine/core';


// const ProductDetail = () => {
//   const { id } = useParams();
//   const {token} = useContext(AuthContext);

//   const { data, loading, error } = useQuery(MY_PRODUCTS, {
//     context: {
//       headers: {
//         authorization: token,
//       },
//     },
//   });
//   const [buyProduct] = useMutation(BUY_PRODUCT, {
//     context: {
//       headers: {
//         authorization: token,
//       },
//     },
//     refetchQueries: [
//          { query: MY_PRODUCTS, context: { headers: { authorization: token } } },
//     ],
//   });
//   const [rentProduct] = useMutation(RENT_PRODUCT, {
//     context: {
//       headers: {
//         authorization: token,
//       },
//     },
//     refetchQueries: [
//          { query: MY_PRODUCTS, context: { headers: { authorization: token } } },
//     ],
//   });
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [openedBuy, setOpenedBuy] = useState(false);
//   const [openedRent, setOpenedRent] = useState(false);
//   const [rentStart, setRentStart] = useState(new Date());
//   const [rentEnd, setRentEnd] = useState(new Date());

//   useEffect(() => {
//     if (data && !loading && !error) {
//       const foundProduct = data.myProducts.find(p => p.id === parseInt(id));
//       if (foundProduct) {
//         setProduct(foundProduct);
//       }
//     }
//   }, [data, loading, error, id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     showNotification({ message: error.message, color: 'red' });
//     return <p>Error :(</p>;
//   }

//   const handleBuy = async () => {
//     try {
//       await buyProduct({ variables: { id: parseInt(id) } });
//       showNotification({ message: 'Product bought', color: 'green' });
//       setOpenedBuy(false);
//       navigate('/');
//     } catch (error) {
//       showNotification({ message: error.message, color: 'red' });
//     }
//   };

//   const handleRent = async () => {
//     if (rentStart >= rentEnd) {
//       showNotification({ message: 'Invalid rental period', color: 'red' });
//       return;
//     }
//     try {
//       await rentProduct({ variables: { id: parseInt(id), startDate: rentStart.toISOString(), endDate: rentEnd.toISOString() } });
//       showNotification({ message: 'Product rented', color: 'green' });
//       setOpenedRent(false);
//       navigate('/');
//     } catch (error) {
//       showNotification({ message: error.message, color: 'red' });
//     }
//   };

//   if (!product) return <p>Product not found</p>;

//   return (
//     <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//       <Paper p="md" withBorder shadow="md" style={{ maxWidth: '600px', width: '100%' }}>
//         <Stack>
//           <MantineTitle order={2} align="center">{product.title}</MantineTitle>
//           <Text align="center" color="dimmed">{product.categories.join(', ')}</Text>
//           <Text align="center">{product.description}</Text>
//           <Group position="center" spacing="md">
//             <Button color="blue" onClick={() => setOpenedRent(true)}>Rent</Button>
//             <Button color="green" onClick={() => setOpenedBuy(true)}>Buy</Button>
//           </Group>
//         </Stack>
//       </Paper>

//       <Modal opened={openedBuy} onClose={() => setOpenedBuy(false)} title="Confirm Purchase" centered>
//         <Text>Are you sure you want to buy this product?</Text>
//         <Group position="right" mt="md">
//           <Button variant="default" color="red" onClick={() => setOpenedBuy(false)}>No</Button>
//           <Button color="violet" onClick={handleBuy}>Yes</Button>
//         </Group>
//       </Modal>

//       <Modal opened={openedRent} onClose={() => setOpenedRent(false)} title="Rental Period" centered>
//         <Stack>
//           <DatePicker label="From" value={rentStart} onChange={setRentStart} />
//           <DatePicker label="To" value={rentEnd} onChange={setRentEnd} />
//           <Group position="right" mt="md">
//             <Button variant="default" color="red" onClick={() => setOpenedRent(false)}>Go Back</Button>
//             <Button color="violet" onClick={handleRent}>Confirm</Button>
//           </Group>
//         </Stack>
//       </Modal>
//     </div>
//   );
// };

// export default ProductDetail;

