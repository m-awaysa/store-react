import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product}) => {
  return <div className="card m-2">
  <Link to={`/products/${product.id}`}  style={{ width: '15rem'}} key={product.id}>
    <img src={product.image} className={` ${styles['product-img']}`}  alt="..." />
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <div className="card-text text-danger">{product.price}$</div>
    </div>
  </Link>
  <div className={styles['nonvisible']}></div>
  <button className={`btn btn-primary rounded-0 align-bottom ${styles['cart-btn']}`}>Add To Cart</button>
  </div>


};

export default ProductCard;