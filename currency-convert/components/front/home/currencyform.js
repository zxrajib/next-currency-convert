import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField,Button,FormControl,Select,MenuItem } from '@material-ui/core';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import handleBlur from "../../../utilities/functions/handleBlur";
import publicServer from "../../../utilities/server/publicServer";
// import { useRef,useState } from "react";
import {useEffect, useState} from 'react';
import { object } from 'yup/lib/locale';


const useStyles = makeStyles((theme) => ({
  grid:{}
}));

export default function Currencyform() {
  const classes = useStyles();
  const API_KEY = process.env.API_KEY  
  const [countries, setCountries] = useState({
    loading: true,
    data: {},
    notFound: false,
  })

  useEffect(() => {
    loadCountry();
  },[])

  const loadCountry = ()=>{
    publicServer.get(`/currencies?api_key=${API_KEY}`)
    .then(res => {
      console.log('res',res)
      setCountries(prevState => ({
        ...prevState,
        loading: false,
        data: res.data.currencies
      }))
    }).catch(error => {
      setCountries(prevState => ({
        ...prevState,
        loading: false,
        notFound: true
      }))
    })
  }
 

// console.log('countries',countries.data);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
      countryCode: ""
    },
    validationSchema: Yup.object().shape({
      amount: Yup.string().max(255).required("amount is required")
    }),    
    
    onSubmit: (values) => {
      const currencyForm = {
        amount: values.amount,
        countryCode: values.countryCode,

      };
      console.log(currencyForm);
      const API_KEY = process.env.API_KEY   
      publicServer
        .get(`/fetch-all?api_key=${API_KEY}`)
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
            <Grid item sm={4} xs={4} style={{ textAlign:"right"}}>
          <Box mt={2}>

           <Button className={classes.button}>
              From
          </Button>
            <FormControl className={classes.formControl}>
            <Select
                labelId="countryCode"
                className="siCustomInput"
                id="countryCode"
                error={Boolean(formik.touched.countryCode && formik.errors.countryCode)}
                value={formik.values.countryCode}
                onChange={formik.handleChange}
                label="Article Category"
                name="countryCode"
            >
              {
                Object.keys(countries.data).map((countryCode, i) => (
                  <MenuItem key={countryCode}>{countryCode}:{countries.data[countryCode]}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </Box>
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
