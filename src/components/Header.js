import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import classes from '../styles/Header.module.css';
import { fetchAPI } from '../utils/dataFetching';
import { success } from '../redux/slices/alertSlice';

function Header() {

    const { auth, cart } = useSelector(state => ({ auth: state.auth, cart: state.cart }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function homeLink() {
        if (auth?.loggedIn)
            navigate('/dashboard');
        else
            navigate('/');
    };

    const logoutHandler = async () => {
        try {
            const { message } = await fetchAPI({
                method: 'GET',
                url: 'logout'
            });

            dispatch(success(message));

            dispatch(logout());
        } catch (err) {
            alert(err.message);
        }
    };

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
                            <span>{cart.count}</span>
                            <p>Cart</p>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;