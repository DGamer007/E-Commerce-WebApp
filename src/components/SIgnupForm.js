import { useDispatch } from 'react-redux';
import classes from '../styles/SignupForm.module.css';
import { login } from '../redux/slices/authSlice';
import { fetchAPI } from '../utils/dataFetching';
import { Alert, Snackbar } from '@mui/material';
import { failure, success } from '../redux/slices/alertSlice';

function SignupForm() {
    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();
        try {

            const password = e.target.elements.password.value.trim();
            const confirmPassword = e.target.elements.cpassword.value.trim();
            const email = e.target.elements.email.value.toLowerCase().trim();
            const firstName = e.target.elements.fname.value.trim();
            const lastName = e.target.elements.lname.value.trim();

            if (password !== confirmPassword) {
                throw new Error('Passwords don\'t match.');
            }

            const requestObject = {
                method: 'POST',
                url: 'signup',
                body: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            };

            const { data, message } = await fetchAPI(requestObject);

            dispatch(success(message));

            setTimeout(() => {
                dispatch(login({
                    loggedIn: true,
                    user: data.user.id
                }));
            }, 4000);

        } catch (err) {
            dispatch(failure(err.message));
        }
    }

    return (
        <form onSubmit={submitHandler} className={classes.section}>
            <div className={classes.subsection}>
                <h2>Personal Information</h2>
                <hr className='line' />
                <span className='spannedtext'>Please enter the following information to create your account.</span>

                <div className={classes.form1}>
                    <div className='h_fields'>
                        <div className='formfield' >
                            <label htmlFor='fname'>
                                First Name *
                            </label>
                            <input type='text' name='fname' id='fname' />
                        </div>
                        <div className='formfield' >
                            <label htmlFor='lname'>
                                Last Name *
                            </label>
                            <input type='text' name='lname' id='lname' />
                        </div>
                    </div>
                    <div className='formfield' >
                        <label htmlFor='email'>
                            Email Address *
                        </label>
                        <input type='email' name='email' id='email' />
                    </div>
                </div>
            </div>
            <div className={classes.subsection}>
                <h2>Login Information</h2>
                <hr className='line' />

                <div className={classes.form2}>
                    <div className='h_fields'>
                        <div className='formfield'>
                            <label htmlFor='password'>Password *</label>
                            <input type='password' name='password' id='password' />
                        </div>
                        <div className='formfield'>
                            <label htmlFor='cpassword'>Confirm Password *</label>
                            <input type='password' name='cpassword' id='cpassword' />
                        </div>
                    </div>
                </div>
            </div>
            <button
                type='submit'
                className={`themepinkbutton ${classes.custombutton}`} >
                Register
            </button>
        </form>
    );
}

export default SignupForm;