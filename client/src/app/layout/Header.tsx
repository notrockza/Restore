import { Box, AppBar, Toolbar, IconButton, Typography, Button, } from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
//rfc

export default function Header(props : any) {
  return (
    <Box sx={{ flexGrow: 1 , mb:5 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Switch {...label} defaultChecked onClick={props.handleMode} color='default' />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lnwza007
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
}
