import { Box, AppBar, Toolbar, IconButton, Typography, List, Badge, ListItem, } from '@mui/material';
import Switch from '@mui/material/Switch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
//rfc

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
  ];
  const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
  ];

  const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
    color: "grey.500",
    },
    "&.active": {
    color: "text.secondary",
    },
    };


export default function Header(props : any) {
  return (
    <Box sx={{ flexGrow: 1 , mb:5 }}>
    <AppBar position="static">
      <Toolbar sx={{ display:"flex" ,justifyContent:"space-between", alignItems:"center"}}>

       <Box sx={{ display:"flex" ,justifyContent:"space-between", alignItems:"center"}}>
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
       </Box>
     
        <Box>
        <List sx={{display:"flex"}}>
          {midLinks.map(({title,path})=>(
            <ListItem key={title} component={NavLink} to={path} sx={navStyles}>{title} </ListItem>
          ))}
      </List>
        </Box>

      
        <Box sx={{ display:"flex" , alignItems:"center"}}>
          <IconButton>
           <Badge badgeContent={4} color="error" >
             <ShoppingCartIcon />
          </Badge>
          </IconButton>
        
          <List sx={{display:"flex"}}>
          {rightLinks.map(({title,path})=>(
            <ListItem key={title} component={NavLink} to={path} sx={navStyles}>{title} </ListItem>
          ))}
      </List>
            
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
}
