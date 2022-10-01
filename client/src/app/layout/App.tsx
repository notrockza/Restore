import React, { useEffect, useState } from 'react'
import Header from './Header'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import { Container } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from '../../features/catalog/ProductDetails';
import HomePage from '../../features/home/HomePage';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../context/ContactPage';
import NotFound from '../errors/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServerError } from '../errors/ServerError';
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import { getCookie } from '../util/util';
import BasketPage from '../../features/basket/BasketPage';
import LoadingComponent from './LoadingComponent';
import { PrivateLogin, PrivateRoute } from "./";

export default function App() {

  const { setBasket } = useStoreContext(); //ควบคุมสเตทด้วย React context to Centralize
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
    //เปรียนเทียบ ค่าเก่าของ คุกขึ้
  }, [setBasket]);

  const [mode ,setMode] = useState(false)
  const displayMode =  mode ? 'dark': 'light'

  const darkTheme = createTheme({
    palette: {
      mode : displayMode
    },
  });
  const handleMode = ()=>{
    setMode(!mode)
  }

  

  if (loading) return <LoadingComponent message="Initilize App....." />;
  
  return (
   
    <>
      
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          autoClose={200}
          // hideProgressBar
          theme="colored"
        />
      <CssBaseline />
      <Header handleMode={handleMode}/> 
      <Container>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="*" element={<NotFound />} />
        <Route
              path="/login"
              element={
                <PrivateLogin>
                  <Login />
                </PrivateLogin>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>


      </Routes>
        </Container>
      </ThemeProvider>
    </>



// React.Fragment นานๆไปก็เเบบนี้ได้ (ไม่ต้องใส่อะไรเลย)=>  <></>
  )
}
