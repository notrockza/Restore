import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { Product } from '../../app/models/Product'
import MoreVertIcon from '@mui/icons-material/MoreVert';
//rfc

interface Props{
  product : Product
}

export default function ProductCard({product}: Props) {
  return (
    <>
    <Card sx={{ maxWidth: "100%" }}>


    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name.at(0)?.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.brand}
        subheader={product.name}
      />

  <CardMedia
    component="img"
    alt="green iguana"
    height="100%"
    sx={{ bgcolor:"lightblue"}}
    image={product.pictureUrl}
    // image={`https://picsum.photos/200/300?random=${Math.random()}`}
    
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      ${(product.price/100).toFixed(2)}
    </Typography>
    <Typography variant="body2" color="text.secondary">
     {product.description}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Add to Cart</Button>
    <Button size="small">View</Button>
  </CardActions>
</Card>
    </>
  )
}