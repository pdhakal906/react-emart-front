import React from 'react'
import { Route, Routes } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import RootLayout from './components/RootLayout';
import AuthRoutes from './components/AuthRoutes'
import Login from './pages/auths/Login';
import SignUp from './pages/auths/SignUp';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import UserRoutes from './components/UserRoutes';
import CheckoutPage from './pages/auths/CheckoutPage';
import Shipping from './pages/auths/Shipping';
import UserProfile from './pages/UserPage/UserProfile';
import OrderPage from './pages/UserPage/OrderPage';
import AdminRoutes from './components/AdminRoutes';
import ProductList from './pages/AdminPage/ProductList';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='product/detail/:id' element={<ProductDetail />} />
          <Route path='user/cart' element={<CartPage />} />


          <Route element={<AuthRoutes />}>
            <Route path='user/login' element={<Login />} />
            <Route path='user/signup' element={<SignUp />} />

          </Route>

          <Route element={<UserRoutes />} >

            <Route path='user/checkout' element={<CheckoutPage />} />
            <Route path='user/shipping' element={<Shipping />} />
            <Route path='user/profile' element={<UserProfile />} />
            <Route path='user/orderDetail/:id' element={<OrderPage />} />

          </Route>

          <Route element={<AdminRoutes />} >
            <Route path='products/all' element={<ProductList />} />
          </Route>

        </Route>
      </Routes >

      <ToastContainer autoClose={1000} position='top-left'></ToastContainer>

    </>
  );
}

export default App
