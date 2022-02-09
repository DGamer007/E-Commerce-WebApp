import BreadCrumb from '../components/BreadCrumb';
import LoginForm from '../components/LoginForm';
import LoginPageContent from '../components/LoginPageContent';
import classes from '../styles/LoginPage.module.css';

function LoginPage() {
    return (
        <section className={classes.section}>
            <BreadCrumb location='Login' />
            <h1 className={classes.title}>Login or Create an Account</h1>
            <div className={classes.sub_section}>
                <LoginPageContent />
                <LoginForm />
            </div>
        </section>
    );
}

export default LoginPage;