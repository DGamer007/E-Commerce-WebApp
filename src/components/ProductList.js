import { ListProducts } from '../utils/dummyData';
import classes from '../styles/ProductList.module.css';
import ProductListItem from './ProductListItem';

function ProductList() {
    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <input type='search' placeholder='Search...' className={`searchbar ${classes.searchbar}`} />
                <button className={`themepinkbutton ${classes.searchbutton}`}>Add Product</button>
            </div>
            <div className={classes.container}>
                <table className={classes.table}>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Data Source
                        </th>
                        <th>
                            Query
                        </th>
                        <th></th>
                    </tr>
                    {
                        ListProducts.map(product => <ProductListItem product={product} />)
                    }
                </table>
            </div>
            <div className={classes.pagination}>
                <div>
                    <label htmlFor='pages'>Rows per page:</label>
                    <select id='pages' name='pages'>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                    </select>
                </div>
                <p>1-5 of 6</p>
                <div className={classes.arrows}>
                    <img src='/images/breadcrumb-arrow.svg' alt='Left Arrow' />
                    <img src='/images/breadcrumb-arrow.svg' alt='Right Arrow' />
                </div>
            </div>
        </div>
    );
}

export default ProductList;