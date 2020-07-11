import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    position: 'absolute',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    backgroundColor: 'white',
    outline: 'none',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
}));