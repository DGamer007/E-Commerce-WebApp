import { useDispatch } from 'react-redux';
import { fetchAPI } from '../utils/dataFetching';
import { login } from '../redux/slices/authSlice';
import { failure, success } from '../redux/slices/alertSlice';
import classes from '../styles/LoginForm.module.css';

const LoginForm = () => {
    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const requestObject = {
                method: 'POST',
                url: 'login',
                body: {
                    email: e.target.elements.email.value,
                    password: e.target.elements.password.value
                }
            };

            const { data, message } = await fetchAPI(requestObject);

            dispatch(success(message));
            dispatch(login({
                loggedIn: true,
                user: data.user.id
            }));

        } catch (err) {
            dispatch(failure(err.message));
        }
    }

    return (
        <div className={classes.section}>
            <h2>Registered Customers</h2>
            <hr className='line' />
            <span className='spannedtext'>
                If you have an account with us, please log in.
            </span>

            <form onSubmit={submitHandler}>
                <div className='formfield'>
                    <label htmlFor='email'>Email Address *</label>
                    <input type='email' name='email' id='email' />
                </div>
                <div className='formfield'>
                    <label htmlFor='password'>Password *</label>
                    <input type='password' name='password' id='password' />
                </div>

                <button className={`themepinkbutton ${classes.custombutton}`} type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;