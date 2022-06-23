import { useNavigate } from 'react-router';
import classes from '../styles/LoginForm.module.css';
import { fetchAPI } from '../utils/dataFetching';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        // try {
        //     const requestObject = {
        //         method: 'POST',
        //         url: 'http://localhost:4000/login',
        //         body: {
        //             email: e.target.elements.email.value,
        //             password: e.target.elements.password.value
        //         }
        //     };

        //     const { data } = await fetchAPI(requestObject);
        //     setAuth({
        //         loggedIn: true,
        //         user: data
        //     });

        // } catch (err) {
        //     alert(err.message);
        // }

        dispatch(login({
            loggedIn: true,
            user: 'someid'
        }));

        // navigate('/dashboard');
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