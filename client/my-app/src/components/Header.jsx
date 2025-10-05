import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Text, Box, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import client from '../apollo/client';

const AppHeader = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myProducts');

  const handleLogout = async () => {
    try {
      await client.clearStore();
      setToken(null);
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { label: 'My Products', path: '/', id: 'myProducts' },
    { label: 'Lent Products', path: '/lent-products', id: 'lentProducts' },
    { label: 'Borrowed Products', path: '/borrowed-products', id: 'borrowedProducts' },
    { label: 'Sold Products', path: '/sold-products', id: 'soldProducts' },
    { label: 'All Products', path: '/all-products', id: 'allProducts' },
  ];

  const handleNavClick = (path, id) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <Box
      h={60}
      px="md"
      style={{
        backgroundColor: '#6c757d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text c="white" fw={700}>
        Teebay
      </Text>
      <Group spacing="xs">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'filled' : 'subtle'}
            color={activeTab === item.id ? 'blue' : 'gray'}
            onClick={() => handleNavClick(item.path, item.id)}
          >
            {item.label}
          </Button>
        ))}
        <Button variant="subtle" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </Box>
  );
};

export default AppHeader;















// Implementing Final Part

// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Button, Text, Box } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';
// import client from '../apollo/client';


// const AppHeader = () => {
//   const { setToken } = useContext(AuthContext);
//   const navigate = useNavigate();

//  const handleLogout = async () => {
//     try {
//       await client.clearStore(); 
//       setToken(null); 
//       localStorage.removeItem('token'); 
//       navigate('/'); 
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <Box
//       h={60}
//       px="md"
//       style={{
//         backgroundColor: '#6c757d',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}
//     >
//       <Text c="white" fw={700}>
//         Teebay
//       </Text>
//       <Button variant="subtle" color="red" onClick={handleLogout}>
//         Logout
//       </Button>
//     </Box>
//   );
// };

// export default AppHeader;


