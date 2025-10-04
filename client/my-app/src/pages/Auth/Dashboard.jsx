import React, { useContext } from 'react';
import { Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        
    navigate('/'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Authenticated</h1>

      <Group position="center" mt="xl">
        <Button color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </div>
  );
};

export default Dashboard;
