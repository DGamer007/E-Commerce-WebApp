import { CartProducts } from '../utils/dummyData';
import classes from '../styles/CartList.module.css';
import { useEffect, useState } from 'react';
import CartListItem from './CartListItem';

function CartList() {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        for (let { amount, sale, quantity } of CartProducts) {
            sum += ((amount - ((amount * sale) / 100)) * quantity);
        }
        setTotal(sum);
    }, []);

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2>{`My Shopping Bag (${CartProducts.length} Items)`}</h2>
                <h2>{`Total price: ₹${total}`}</h2>
            </div>
            <div className={classes.items}>
                {
                    CartProducts.map(product => <CartListItem key={product.id} product={product} />)
                }
            </div>
            <button className={`themepinkbutton ${classes.button}`}>Place Order</button>
        </div>
    );
}

export default CartList;