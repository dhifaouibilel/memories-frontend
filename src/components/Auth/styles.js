import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: `${theme.spacing(1)} !important`,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: `${theme.palette.secondary.main} !important`,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: `${theme.spacing(3, 0, 1)} !important`,
  },
  googleButton: {
    margin: `${theme.spacing(3,0,2)} !important`,
  },
});