import classes from '../styles/SignupForm.module.css';

function SignupForm() {
    return (
        <div className={classes.section}>
            <div className={classes.subsection}>
                <h2>Personal Information</h2>
                <hr className='line' />
                <span className='spannedtext'>Please enter the following information to create your account.</span>

                <form>
                    <div className={classes.h_fields}>
                        <div className='formfield' >
                            <label htmlFor='fname'>
                                First Name *
                            </label>
                            <input type='text' id='fname' />
                        </div>
                        <div className='formfield' >
                            <label htmlFor='lname'>
                                Last Name *
                            </label>
                            <input type='text' id='lname' />
                        </div>
                    </div>
                    <div className='formfield' >
                        <label htmlFor='email'>
                            Email Address *
                        </label>
                        <input type='email' id='email' />
                    </div>
                </form>
            </div>
            <div className={classes.subsection}>
                <h2>Login Information</h2>
                <hr className='line' />

                <form>
                    <div className={classes.h_fields}>
                        <div className='formfield'>
                            <label htmlFor='password'>Password *</label>
                            <input type='password' id='password' />
                        </div>
                        <div className='formfield'>
                            <label htmlFor='cpassword'>Confirm Password *</label>
                            <input type='password' id='cpassword' />
                        </div>
                    </div>
                </form>
            </div>
            <button className={`themebutton ${classes.custombutton}`}>
                Register
            </button>
        </div>
    );
}

export default SignupForm;