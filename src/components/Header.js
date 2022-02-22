import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import classes from '../styles/Header.module.css';

function Header() {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    function homeLink() {
        if (auth?.loggedIn)
            navigate('/dashboard');
        else
            navigate('/');
    };

    function logoutHandler() {
        setAuth({ loggedIn: false });
    }

    return (
        <header>
            <div className={classes.top}></div>
            <div className={classes.container}>
                <img className={classes.logo} src='/images/site-logo.svg' onClick={homeLink} />
                <ul className={classes.list}>
                    {
                        auth?.loggedIn ? (
                            <li className={classes.clickable} onClick={logoutHandler}>Logout</li>
                        ) : (
                            <>
                                <Link
                                    to='/'
                                    replace
                                    className={classes.clickable} >
                                    Login
                                </Link>
                                <li>
                                    |
                                </li>
                                <Link
                                    to='/signup'
                                    replace
                                    className={classes.clickable} >
                                    Register
                                </Link>
                            </>

                        )
                    }

                    <li>
                        <button
                            className={classes.cart_button}
                            onClick={() => navigate('/cart')} >
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