import { useSelector } from 'react-redux';
import CartList from '../components/CartList';

const CartPage = () => {
    const { count } = useSelector(state => state.cart);
    return (
        <section className='pagesection'>
            <h1 className='pagetitle'>Cart Page</h1>
            {
                count ? (
                    <CartList />
                ) : (
                    <div className='imagecontainer'>
                        <img
                            alt='Empty Cart'
                            src='/images/cart-empty.gif'
                        />
                    </div>
                )
            }
        </section>
    );
};

export default CartPage;