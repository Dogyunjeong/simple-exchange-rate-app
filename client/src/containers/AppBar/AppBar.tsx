import * as React from 'react'
import { AppBar as MAppBar, Toolbar, Typography, makeStyles, createStyles, Theme } from '../../components/MaterialUI'

export interface AppBarProps { }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const AppBar: React.FC<AppBarProps> = () => {
  const classes = useStyles()

  return (
    <MAppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Country Exchange rate
        </Typography>
      </Toolbar>
    </MAppBar>
  )
}

export default AppBar