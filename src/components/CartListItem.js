import classes from '../styles/CartListItem.module.css';

function CartListItem({ product }) {
    return (
        <div className={classes.container}>
            <img src='/images/dummy-image.png' />
            <div className={classes.cardcontent}>
                <div className={`${classes.h_content} ${classes.first_div}`}>
                    <span>{product.title}</span>
                    <span>₹{product.amount - ((product.amount * product.sale) / 100)}</span>
                </div>
                <div className={`${classes.h_content} ${classes.second_div}`}>
                    <span>Cart item name</span>
                    <div className={classes.sale}>
                        <span>
                            ₹<s>{product.amount}</s>
                        </span>
                        <span>
                            {product.sale}% off
                        </span>
                    </div>
                </div>
                <div className={classes.h_content}>
                    <div className={classes.buttons}>
                        <button className='themepinkbutton'>+</button>
                        <span>{product.quantity}</span>
                        <button className='themepinkbutton'>-</button>
                    </div>
                    <span className={classes.removebutton}>Remove</span>
                </div>
            </div>
        </div>
    );
}

export default CartListItem;