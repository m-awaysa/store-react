import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import styles from './Category.module.css';

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryImage] = useState([
    "electronics.png",
    "jewelery.png",
    "men's-clothing.png",
    "women's-clothing.png"]);


  const getCategories = async () => {
    let { data } = await axios.get('https://fakestoreapi.com/products/categories');
    setCategories(data);
    setLoading(false)

  }

  useEffect(() => {
    getCategories()
  }, []);

  return (<>
    <h3 className='text-center d-flex-0'>Category</h3>
    {loading ? <Loader width={'w-100'} /> : <div className='d-flex flex-row justify-content-evenly flex-wrap mt-5 mb-5 p-0'>
      {categories.map((category, index) => {
        return <Link key={index} to={`/category/${category}`} className="card" style={{ width: '10rem' }}>
          <img src={`image/${categoryImage[index]}`} className={` ${styles['category-img']}`} alt="..." />
          <div className="text-center ">
            <h5 className="card-title ">{category}</h5>
          </div>
        </Link>
      })}
    </div>}
  </>
  )
}

export default Category