import { makeStyles } from '@mui/styles';


export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px !important',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    // marginTop: '16px !important',
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block !important',
    textAlign: 'initial !important',
  },
  comments: {
    marginBottom: '20px',
    // paddingBottom: '30px',
  },
  comment:{
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems: 'center !important',
    margin: '16px 0',
    width: '100%',
  },
  comment_details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  comment_description: {
    display: 'flex',
    alignItems: 'center !important',
    fontWeight: 'lighter',
  },
  comment_creator: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'lighter',
    alignItems: 'center !important',
    lineHeight: 0.5
  },
  comment_entry: {
    position: 'sticky',
    bottom: -5,
    left: 0,
    right: 0,
    padding: 8,
    paddingBottom: 8,
    margin: 0,
  },
  comment_actions:{
    display: 'flex',
    flex: '1 1 0px',
    gap: 3,
  }
});