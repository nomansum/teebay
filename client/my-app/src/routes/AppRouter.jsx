import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Auth/Dashboard';


const AppRouter = () => {
  return (
    
        <BrowserRouter>
         
         <Routes>
            
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
             <Route path='/' element={<Dashboard />}></Route>
         </Routes>

        </BrowserRouter>
      
    
  )
}

export default AppRouter
