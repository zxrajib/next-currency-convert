import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField,Button } from '@material-ui/core';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import handleBlur from "../../../utilities/functions/handleBlur";
// import publicServer from "../../../utilities/server/publicServer";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  grid:{}
}));

export default function Currencyform() {
  const classes = useStyles();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.string().max(255).required("amount is required")
    }),    

    onSubmit: (values, actions) => {
      // const currencyForm = {
      //   amount: values.amount
      // };
      console.log('hi');
      axios.get("https://api.fastforex.io/fetch-all?api_key=213b15dcf9-8b11e172b3-qzcwzl")
        .then((response) => {
          console.log('response',response);
        })
        .catch((err) => {
          console.log('err',err)
        });
    }
  })



  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item lg={3} md={3} xs={3}>
              <TextField
                error={Boolean(formik.touched.amount && formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                fullWidth
                label="amount"
                margin="normal"
                name="amount"
                type="amount"
                placeholder="amount"
                variant="outlined"
                onBlur={(event) => handleBlur(event, formik)}
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
            <Button
              color="default"
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              fullWidth={false}
              disabled={formik.isSubmitting}
            >
              Convert
            </Button>
            </Grid>
          
        </Grid>
        </form>
      </Box>
    </>
  )
}
