import React, { useState } from 'react'
import Header from './Header'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import { Container } from '@mui/system';
import ProductList from '../../features/catalog/ProductList';

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
        <Catalog></Catalog>
        </Container>
      </ThemeProvider>
    </>



// React.Fragment นานๆไปก็เเบบนี้ได้ (ไม่ต้องใส่อะไรเลย)=>  <></>
  )
}
