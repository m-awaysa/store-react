import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios'
import Search from '../Common/Search/Search';
import ProductsWrapper from '../Common/ProductsWrapper/ProductsWrapper';
import ProductCard from '../Common/ProductCard/ProductCard';
import Loader from '../Loader/Loader';

function CategoryProduct() {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(categoryProduct);
    let params = useParams();

    let getProduct = async () => {
        let { data } = await axios.get(`https://fakestoreapi.com/products/category/${params.name}`);
        setCategoryProduct(data);
        setFilter(data)
        setLoading(false)
    }

    const searchFilter = (event) => {
        const { value } = event.target;
        const arr = []
        categoryProduct.foreach((product) => {
            if (product.title.toLowerCase().includes(value.toLowerCase())) {
                arr.push(product)
            }
        })
        setFilter(arr);
        // setPageInfo({ ...pageInfo, pageNumber: 0 })
    }

    useEffect(() => {
        getProduct()
    }, []);

    return (<>  {loading ? <Loader />
        : <div className='my-5'>
            <h3 className='text-center'>Product</h3>
            <Search searchFilter={searchFilter} />
            <ProductsWrapper>
                {filter.map((product, index) => {
                    return <ProductCard product={product} />
                })}
               
            </ProductsWrapper>
        </div>}
    </>
    )
}

export default CategoryProduct