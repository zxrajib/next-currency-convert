import Head from 'next/head'
import Image from 'next/image'
import Frontlayout from '../components/front/layouts/frontlayout'
import HomePage from '../components/front/home/home'

export default function Home() {
  return (
    <>
      <Frontlayout>     
      <HomePage></HomePage>
     </Frontlayout>
    </>
  )
}
