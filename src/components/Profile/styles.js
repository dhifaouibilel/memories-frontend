import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';

const theme = createTheme();

export default makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: 8,
    },
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center !important',
    margin: '100px auto auto 10%',
    paddingBottom: '40px',
    padding: '0 5%'
  },
  profile_header:{
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  profile_img: {
    top: '160px',
    position: 'absolute !important',
    [theme.breakpoints.down('sm')]: {
      top: '240px !important', 
    },
    border: '2px solid #FFC300',
    boxShadow: 'rgba(255, 195, 0, 0.23) 0px 3px 6px, rgba(255, 195, 0, 0.23) 0px 3px 6px'
  },
  userInfo: {
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '70px',
    fontWeight: 'bolder',
  },
  profile_form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    padding: 40
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fileInput: {
    width: '95%',
    margin: '10px',
  },
  buttonSubmit: {
    margin: '20px auto !important',
    fontWeight: 'bolder !important'
  },
  profile_stats: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    [theme.breakpoints.down('sm')]: {

    }
  },
  boxStat:{
    display: 'flex', 
    flexDirection:'column',
    alignItems: 'center',
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '40% !important', 
      fontSize: '12px !important',
      marginBottom: 16
    }
  },
  boxStat_title:{
    paddingBottom: 1,
    [theme.breakpoints.down('sm')]: { 
      fontSize: '16px !important',
    }
  },
  boxStat_data:{
    [theme.breakpoints.down('sm')]: { 
      fontSize: '24px !important',
    }
  },
  follow_rows:{
    display: 'flex',
    flexDirection:'column',
    gap: 3
  },
  follow_row:{
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    cursor: 'pointer',
  },
  posts_section_title:{
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px !important', 
    }
  }
});