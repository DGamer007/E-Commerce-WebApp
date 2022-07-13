import classes from '../styles/CartList.module.css';
import CartListItem from './CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPI } from '../utils/dataFetching';
import { readyCartData } from '../redux/slices/cartSlice';
import { failure, success } from '../redux/slices/alertSlice';

const CartList = () => {

    const { products, count, total } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const saveCart = async () => {
        try {
            const { message } = await fetchAPI({
                url: 'save/cart',
                method: 'POST',
                body: {
                    products: readyCartData(products),
                    count,
                    total
                }
            });

            dispatch(success(message));

        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
        }
    };

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2>{`My Shopping Bag (${count} Items)`}</h2>
                <h2>{`Total price: ₹${total}`}</h2>
            </div>
            <div className={classes.items}>
                {
                    products.map(product => <CartListItem key={product.data.id} product={product} />)
                }
            </div>
            <button
                className={`themepinkbutton ${classes.button}`}
                onClick={saveCart}>
                Save Cart
            </button>
        </div>
    );
};

export default CartList;