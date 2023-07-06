import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
// console.log(theme.breakpoints)
export default makeStyles({
  appBar: {
    fontFamily: 'cursive, Arial, sans-serif',
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row !important',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  heading: {
    color: '#B0A090'
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      margin: '10px 0 30px',
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column !important',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
  
});

// color: 'rgba(0,183,255, 1)',