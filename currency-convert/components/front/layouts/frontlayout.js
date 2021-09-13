import React from 'react'
import Head from 'next/head'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/footer'

export default function Frontlayout({title,keywords,description,children}) {
  return (
    <>
      <Head>
      <title>{title}</title>
      <meta name="viewport" content={description} />
      <meta name="viewport" content={keywords} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}