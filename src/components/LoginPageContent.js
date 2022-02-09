import classes from '../styles/LoginPageContent.module.css';

function LoginPageContent() {
    return (
        <div className={classes.section}>
            <div className={classes.section_one}>
                <h2>New Customer</h2>
                <hr />
                <span>Registration is free and easy.</span>
                <ul>
                    <li>
                        Faster Checkout
                    </li>
                    <li>
                        Save multiple shipping addresses
                    </li>
                    <li>
                        View and track orders and more
                    </li>
                </ul>
            </div>
            <div className={classes.section_two}>
                <button>
                    Create an Account
                </button>
            </div>
        </div>
    );
}

export default LoginPageContent;