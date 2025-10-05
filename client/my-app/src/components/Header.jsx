import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Text, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import client from '../apollo/client';


const AppHeader = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <Button variant="subtle" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default AppHeader;


