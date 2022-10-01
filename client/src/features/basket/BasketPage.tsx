import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStoreContext } from '../../app/context/StoreContext';
import { Box } from '@mui/system';
import { currencyFormat } from '../../app/util/util';
import { LoadingButton } from '@mui/lab';

export default function BasketPage() {
 const {basket , setBasket} = useStoreContext();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.items.map((item) => (
            <TableRow
            // key ใส่เพราะ จะทำการ Edit ได้ถูก
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell component="th" scope="row">
              <Box display="flex" alignItems='center' >
        
                {/* alt ทางเลือก */}
                <img src={item.pictureUrl} alt={item.name} style={{height : 100 , marginRight:20}} />
                <span></span>
                {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="right">
                <LoadingButton>
                  
                </LoadingButton>
                {item.quantity}</TableCell>
              <TableCell align="right">{currencyFormat(item.price *  item.quantity)}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
