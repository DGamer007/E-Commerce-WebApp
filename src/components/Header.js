import classes from '../styles/Header.module.css';

function Header() {
    return (
        <header>
            <div className={classes.top}></div>
            <div className={classes.container}>
                <img className={classes.logo} src='/images/site-logo.svg' />
                <ul className={classes.list}>
                    <li className={classes.clickable}>
                        Login
                    </li>
                    <li>
                        |
                    </li>
                    <li className={classes.clickable}>
                        Register
                    </li>
                    <li>
                        <button className={classes.cart_button}>
                            <img src='/images/cart.svg' height='20' width='20' />
                            <span>{0}</span>
                            <p>Cart</p>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;