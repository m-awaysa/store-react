import React from 'react';


const ProductsWrapper = ({children}) => {
  return <div className='d-flex flex-row justify-content-evenly flex-wrap '>
  {children}
  </div>
};

export default ProductsWrapper;