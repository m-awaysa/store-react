import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';


function Product() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    let params = useParams();

    let getProductData = async () => {
        let { data } = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
        setProduct(data);
        setLoading(false);
    }

    useEffect(() => {
        getProductData()
        return () => {

        };
    }, []);

    return <>
        {loading ? <Loader /> : <div className='row mt-5'>
            <div className='col-md-6' style={{ height: "50%" }}>
                <img src={product.image} className=' w-75' alt="..." />
            </div>
            <ul className='col-md-5 m-md-0 my-3'>
                <li>
                    <span className='fw-bold'>Title:</span> {product.title}
                </li>
                <li>
                    <span className='fw-bold'>Price:</span> {product.price}$
                </li>
                <li>
                    <span className='fw-bold'>Description:</span> {product.description}$
                </li>
            </ul>
        </div>}
    </>

}

export default Product