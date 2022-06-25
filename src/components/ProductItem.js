import { useDispatch } from 'react-redux';
import { addProduct, filterAction } from '../redux/slices/cartSlice';
import classes from '../styles/ProductItem.module.css';

const ProductItem = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <div className={classes.section}>
            <img src={`data:image/png;base64,${product.image}`} />
            <div className={classes.product_content}>
                <div className={classes.container}>
                    <span className={classes.product_title}>{product.title}</span>
                    <span className={classes.product_subtitle}>{product.subtitle}</span>
                </div>
                <span className={classes.product_excerpt}>{product.description}</span>
                <div className={classes.container}>
                    {
                        product.sale > 0 ? (
                            <span className={classes.product_amount}>
                                MRP <s>₹{product.amount}</s>
                                <span className={classes.discount}>
                                    {parseFloat(product.sale)}% OFF
                                </span>
                            </span>
                        ) : <br />
                    }
                    <span className={classes.final_amount}>
                        ₹{parseFloat(product.amount - (product.amount * product.sale) / 100)}
                    </span>
                </div>
                <button
                    className={`themepinkbutton ${classes.cartbutton}`}
                    onClick={e => { dispatch(addProduct(filterAction(product))); }} >
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default ProductItem;