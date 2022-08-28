import React, { useState } from 'react'
import Header from './Header'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import { Container } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from '../../features/catalog/ProductDetails';
import HomePage from '../../features/home/HomePage';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';

export default function App() {
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
  
  return (
   
    <>
      
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header handleMode={handleMode}/> 
      <Container>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about" element={<ContactPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />

      </Routes>
        </Container>
      </ThemeProvider>
    </>



// React.Fragment นานๆไปก็เเบบนี้ได้ (ไม่ต้องใส่อะไรเลย)=>  <></>
  )
}
