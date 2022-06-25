import { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, TablePagination, TableRow } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import { fetchAPI } from '../utils/dataFetching';
import ProductListItem from './ProductListItem';
import classes from '../styles/ProductList.module.css';
import { useNavigate } from 'react-router';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteProduct = async (id) => {
        try {
            const { message } = await fetchAPI({
                method: 'DELETE',
                url: 'delete/product',
                body: { id }
            });

            setAlert({
                isOpen: true,
                type: 'success',
                message
            });

            setProducts(prevState => {
                return prevState.filter(item => item.id !== id);
            });
        } catch (err) {
            setAlert({
                isOpen: true,
                type: 'error',
                message: err.message
            });
        }
    };

    const getProducts = async () => {
        try {
            const { data } = await fetchAPI({
                method: 'GET',
                url: 'me/products'
            });

            setProducts(data);
        } catch (err) {
            setAlert({
                isOpen: true,
                type: 'error',
                message: err.message
            });
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <input
                    type='search'
                    placeholder='Search...'
                    className={`searchbar ${classes.searchbar}`} />
                <button
                    onClick={e => { navigate('/product/add'); }}
                    className={`themepinkbutton ${classes.searchbutton}`}>
                    Add Product
                </button>
            </div>
            <div className={classes.container}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>MRP (₹)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) =>
                                <ProductListItem
                                    key={product.id}
                                    product={{ ...product, index: index + 1 }}
                                    deleteProduct={deleteProduct} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <TableContainer><Table><TableBody><TableRow>
                <TablePagination
                    count={100}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </TableRow></TableBody></Table></TableContainer>
            <Snackbar
                open={alert.isOpen}
                autoHideDuration={4000}
                onClose={e => setAlert({ isOpen: false })}>
                <Alert
                    onClose={e => setAlert({ isOpen: false })}
                    severity={alert.type}
                    sx={{ width: '100%' }} >
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProductList;