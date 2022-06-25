import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { DashboardProducts } from '../utils/dummyData';
import { fetchAPI } from '../utils/dataFetching';
import ProductItem from './ProductItem';
import classes from '../styles/ProductItems.module.css';
import { failure } from '../redux/slices/alertSlice';

function ProductItems() {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const getProducts = async () => {
        try {
            const { data } = await fetchAPI({
                method: 'GET',
                url: 'products'
            });

            setProducts(data);
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2>Product Name - 14366 items</h2>
                <div className={classes.sort}>
                    <label htmlFor='sort'>Sort By</label>
                    <select id='sort' name='sort'>
                        <option value='0' >a-z</option>
                        <option value='1'>z-a</option>
                        <option value='2'>0-9</option>
                        <option value='3'>9-0</option>
                    </select>
                </div>
            </div>
            <div className={classes.items}>
                {
                    products.map(product => <ProductItem key={product.id} product={product} />)
                }
            </div>
            <Pagination className={classes.pagination} count={10} color="standard" />
        </div>
    );
}

export default ProductItems;