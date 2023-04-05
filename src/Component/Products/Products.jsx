import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ProductCard from '../Common/ProductCard/ProductCard';
import ProductsWrapper from '../Common/ProductsWrapper/ProductsWrapper';
import Search from '../Common/Search/Search';
import Loader from '../Loader/Loader';

function Products() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(products);
    const [loading, setLoading] = useState(true);


    let getProduct = async () => {
        let { data } = await axios.get('https://fakestoreapi.com/products');
        setProducts(data);
        setFilter(data);
        setLoading(false);
    }

    const searchFilter = (event) => {
        const { value } = event.target;
        const arr = []
        products.foreach((product) => {
            if (product.title.toLowerCase().includes(value.toLowerCase()) || value === '') {
                arr.push(product)
            }
        })
        setFilter(arr);
        // setPageInfo({ ...pageInfo, pageNumber: 0 })
    }
    useEffect(() => {
        getProduct()
    }, []);

    return (
        <div className='my-5'>
            <h3 className='text-center'>Products</h3>
            <Search searchFilter={searchFilter} />
            {loading ? <Loader />
                : <ProductsWrapper>
                    {filter.map((product, index) => {
                        return <ProductCard product={product} />
                    })}
                </ProductsWrapper>}
        </div>
    )
}

export default Products