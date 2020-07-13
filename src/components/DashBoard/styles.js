import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
  },
  wrapperContent: {
    width: '100%',
    padding: 10,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  shiftLeft: {
    marginLeft: -240,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));