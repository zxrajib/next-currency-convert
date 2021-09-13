import React from 'react'
import { Container,Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footerArea:{
      backgroundColor:'#3f51b5',
      padding: theme.spacing(2),
      color:"#ffffff"
      
  }
  }));


export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.footerArea}>
        <Container>
          footer
      </Container>
      </Box>
      
    </>
  )
}
