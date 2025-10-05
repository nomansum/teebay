import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import MyProducts from '../pages/product/MyProducts';
import EditProduct from '../pages/product/EditProduct';
import AddProduct from '../pages/product/AddProduct';
import ProductDetail from '../pages/product/ProductDetails';
import BorrowedProducts from '../pages/product/BorrowedProducts';
import SoldProducts from '../pages/product/SoldProducts';
import LentProducts from '../pages/product/LentProducts';
import AllProducts from '../pages/product/AllProducts';


const AppRouter = () => {
  return (
    
        <BrowserRouter>
         
         <Routes>
            
      <Route path='/' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><MyProducts /></MainLayout></ProtectedRoute>} />
      <Route path="/add-product" element={<ProtectedRoute><MainLayout><AddProduct /></MainLayout></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><MainLayout><EditProduct /></MainLayout></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute><MainLayout><ProductDetail /></MainLayout></ProtectedRoute>} />
      <Route path="/lent-products" element={<ProtectedRoute><MainLayout><LentProducts /></MainLayout></ProtectedRoute>} />
      <Route path="/borrowed-products" element={<ProtectedRoute><MainLayout><BorrowedProducts /></MainLayout></ProtectedRoute>} />
      <Route path="/sold-products" element={<ProtectedRoute><MainLayout><SoldProducts /></MainLayout></ProtectedRoute>} />
      <Route path="/all-products" element={<ProtectedRoute><MainLayout><AllProducts /></MainLayout></ProtectedRoute>} />
         </Routes>

        </BrowserRouter>
      
    
  )
}

export default AppRouter
