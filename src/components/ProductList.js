import { ListProducts } from '../utils/dummyData';
import classes from '../styles/ProductList.module.css';
import ProductListItem from './ProductListItem';
import { TablePagination } from '@mui/material';
import { useState } from 'react';

function ProductList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <input
                    type='search'
                    placeholder='Search...'
                    className={`searchbar ${classes.searchbar}`} />
                <button className={`themepinkbutton ${classes.searchbutton}`}>Add Product</button>
            </div>
            <div className={classes.container}>
                <table className={classes.table}>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Data Source</th>
                        <th>Query</th>
                        <th></th>
                    </tr>
                    {
                        ListProducts.map(product => <ProductListItem key={product.id} product={product} />)
                    }
                </table>
            </div>
            <TablePagination
                count={100}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </div>
    );
}

export default ProductList;