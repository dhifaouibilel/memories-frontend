import { makeStyles } from '@mui/styles';
import '../../fonts/Rigoletto Free.otf'
import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
// console.log(theme.breakpoints)


export default makeStyles({
  '@font-face': {
    fontFamily: 'Rigoletto Free',
    src: 'url("../../fonts/Rigoletto Free.otf") format("opentype")',
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
    }
  }, 
  heading: {
    fontFamily: 'Rigoletto Free !important',
    color: '#B0A090',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  notifBox:{
    display: 'flex',
    marginBottom: "10px",
  },
  notifBox_describe: { 
    margin: '0 6px 0 15px',
  },
  notifBox_msg: {
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px !important',
    }
  },
  notifBox_userName:{
    color: '#FFC300',
    marginRight: '8px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  },
  notifBox_time:{
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px !important',
    }
    // paddingLeft: '10px',
  },
})

// color: 'rgba(0,183,255, 1)',

