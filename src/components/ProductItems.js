import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import { fetchAPI } from '../utils/dataFetching';
import { failure } from '../redux/slices/alertSlice';
import classes from '../styles/ProductItems.module.css';

const ProductItems = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const itemsPerPage = 12;

    const countPages = (totalProducts) => {
        const result = (totalProducts / (itemsPerPage + 1)) + 1;
        return parseInt(result);
    };

    const getProducts = async (page) => {
        try {

            const requestObject = {
                method: 'GET',
                url: 'products',
                queryParams: {
                    take: itemsPerPage,
                    page
                }
            };

            const { data } = await fetchAPI(requestObject);

            setProducts(data.products);
            setCount(data.count);
            setPages(countPages(data.count));
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    const onChange = (event, page) => {
        if (currentPage !== page)
            setCurrentPage(page);
    };

    useEffect(() => {
        getProducts(currentPage - 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);


    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2>Products - {count} items</h2>
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
            <Pagination
                className={classes.pagination}
                onChange={onChange}
                page={currentPage}
                count={pages}
                color="primary" />
        </div>
    );
};

export default ProductItems;