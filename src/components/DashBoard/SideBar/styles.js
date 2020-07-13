import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240,
    maxWidth: 240,
    zIndex: 80,
    height: '100%',
    position: 'relative',
  },
  menuLink: {
    textDecoration: 'none',
    color: 'black'
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'

    },
    '&>div:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  }
}));