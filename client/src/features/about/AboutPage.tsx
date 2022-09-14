import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText } from '@mui/material';
import React ,{useState}from 'react'
import { ToastContainer ,toast} from 'react-toastify'
import agent from '../../app/api/agent';

export default function AboutPage() {
  toast.success('🦄 Wow so easy na eiei!', {
    position: "bottom-right",
    autoClose: 100,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
      agent.TestErrors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch(error => setValidationErrors(error));
      }

  return (
    <Container>
      <ButtonGroup fullWidth variant="contained" >
      <Button onClick={()=>agent.TestErrors.get400Error()} >Test 400 errors </Button>
      <Button onClick={()=>agent.TestErrors.get401Error()} >Test 401 errors </Button>
      <Button onClick={()=>agent.TestErrors.get404Error()} >Test 404 errors </Button>
      <Button onClick={()=>agent.TestErrors.get500Error()} >Test 500 errors </Button>
      <Button onClick={()=> getValidationError()} 
        >
          Test Validation errors </Button>
    </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }
    </Container>
  )
}
