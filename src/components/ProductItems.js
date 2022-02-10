import { Products } from '../utils/dummyData';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import classes from '../styles/ProductItems.module.css';

function ProductItems() {
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
                    Products.map(product => <ProductItem key={product.id} product={product} />)
                }
            </div>
            <Pagination />
        </div>
    );
}

export default ProductItems;