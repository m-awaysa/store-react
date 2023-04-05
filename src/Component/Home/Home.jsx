import React from 'react'
import Category from '../Category/Category.jsx'
import About from '../About/About.jsx'
import Header from '../Header/Header.jsx';

function Home() {

  return (
    <>
          <Header />
   <div className='container text-center align-item-center p-5'>
    <Category />
    <About/>
    </div>

    </>
  )
}

export default Home