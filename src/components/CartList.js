import classes from '../styles/CartList.module.css';
import CartListItem from './CartListItem';
import { useSelector } from 'react-redux';

const CartList = () => {

    const { products, count, total } = useSelector(state => state.cart);

    return (
        <div className={classes.section}>
            {
                count > 0 ? (
                    <>
                        <div className={classes.header}>
                            <h2>{`My Shopping Bag (${count} Items)`}</h2>
                            <h2>{`Total price: ₹${total}`}</h2>
                        </div>
                        <div className={classes.items}>
                            {
                                products.map(product => <CartListItem key={product.data.id} product={product} />)
                            }
                        </div>
                        <button className={`themepinkbutton ${classes.button}`}>Place Order</button>
                    </>
                ) : (
                    <h2><center>Nothing in here ! You freak...</center></h2>
                )

            }

        </div>
    );
};

export default CartList;