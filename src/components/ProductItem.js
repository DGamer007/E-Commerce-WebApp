import classes from '../styles/ProductItem.module.css';

function ProductItem({ product }) {
    return (
        <div className={classes.section}>
            <img src='/images/dummy-image.png' />
            <div className={classes.product_content}>
                <div className={classes.container}>
                    <span className={classes.product_title}>{product.title}</span>
                    <span className={classes.product_subtitle}>{product.subtitle}</span>
                </div>
                <span className={classes.product_excerpt}>{product.excerpt}</span>
                <div className={classes.container}>
                    <span className={classes.product_amount}>
                        MRP ₹{product.amount}
                        <span className={classes.discount}>
                            {parseFloat(product.sale)}% OFF
                        </span>
                    </span>
                    <span className={classes.final_amount}>
                        ₹{parseFloat(product.amount - (product.amount * product.sale) / 100)}
                    </span>
                </div>
                <button className={`themepinkbutton ${classes.cartbutton}`}>ADD TO CART</button>
            </div>
        </div>
    );
}

export default ProductItem;