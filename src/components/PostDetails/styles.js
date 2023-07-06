import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default makeStyles({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    // width: '600px',
    maxHeight: '600px',
    maxWidth: '700px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    paddingTop: '20px',
    // maxwidth: '30%',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
  },
  commentsOuterContainer: {
    display: 'flex',
    width: '80%',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'column',
      padding: '10px 0',
    },
  },
  commentsInnerContainer: {
    height: '200px',
    minWidth: '50%',
    overflowY: 'auto', // to make your div scrollable
    marginRight: '30px',
  },
});