import classes from '../styles/LoginForm.module.css';

function LoginForm() {
    return (
        <div className={classes.section}>
            <h2>Registered Customers</h2>
            <hr className='line' />
            <span className='spannedtext'>
                If you have an account with us, please log in.
            </span>

            <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className='formfield'>
                    <label htmlFor='email'>Email Address *</label>
                    <input type='email' id='email' />
                </div>
                <div className='formfield'>
                    <label htmlFor='password'>Password *</label>
                    <input type='password' id='password' />
                </div>

                <button className={`themebutton ${classes.custombutton}`} type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;