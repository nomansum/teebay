import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import MyProducts from '../pages/product/MyProducts';
import EditProduct from '../pages/product/EditProduct';
import AddProduct from '../pages/product/AddProduct';


const AppRouter = () => {
  return (
    
        <BrowserRouter>
         
         <Routes>
            
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><MainLayout><MyProducts /></MainLayout></ProtectedRoute>} />
           <Route path="/add-product" element={<ProtectedRoute><MainLayout><AddProduct /></MainLayout></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><MainLayout><EditProduct /></MainLayout></ProtectedRoute>} />
         </Routes>

        </BrowserRouter>
      
    
  )
}

export default AppRouter
