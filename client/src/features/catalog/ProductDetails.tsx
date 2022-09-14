/* eslint-disable jsx-a11y/alt-text */
import { Grid, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import agent from '../../app/api/agent'
import NotFound from '../../app/errors/NotFound'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../app/models/Product'

export default function ProductDetails() {
  // มันไม่รู้จัก id ว่า  type เป็นอะไร
  const{id} = useParams<{id : any }>()
  const [product ,setProducts] = useState <Product | null>(null)
  const [loading ,setloading] = useState (true)
  
  useEffect(() => {
    // การเรียกใช้ agent
    agent.Catalog.details(parseInt(id))
  .then((respons=>setProducts(respons)))
  .catch((error)=>console.log(error))
  .finally(()=>setloading(false))
  }, [id])
if (loading) return <LoadingComponent message="Loading Products....." />
if (!product) return <NotFound/>
  
  return (
    <>
    <Grid container spacing={6}>
<Grid item xs={6}>
<img src={product.pictureUrl} style={{ width: "100%" }} />
</Grid>



<Grid item xs={6}>
<Typography variant="h3">{product.name}</Typography>
<Divider sx={{ mb: 2 }} />
<Typography variant="h3" color="secondary">
${(product.price / 100).toFixed(2)}
</Typography>
<TableContainer>
<Table>
<TableBody>
<TableRow>
<TableCell>Name</TableCell>
<TableCell>{product.name}</TableCell>
</TableRow>
<TableRow>
<TableCell>Description</TableCell>
<TableCell>{product.description}</TableCell>
</TableRow>
<TableRow>
<TableCell>Type</TableCell>
<TableCell>{product.type}</TableCell>
</TableRow>
<TableRow>
<TableCell>Brand</TableCell>
<TableCell>{product.brand}</TableCell>
</TableRow>
<TableRow>
<TableCell>Quantitiy in stock</TableCell>
<TableCell>{product.quantityInStock}</TableCell>
</TableRow>
</TableBody>
</Table>
</TableContainer>
</Grid>
</Grid>
    </>
  )
}
