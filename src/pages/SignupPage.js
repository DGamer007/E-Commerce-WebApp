import BreadCrumb from '../components/BreadCrumb';
import SignupForm from '../components/SIgnupForm';

function SignupPage() {
    return (
        <section className='pagesection' >
            <BreadCrumb location='Create an Account' />
            <h1 className='pagetitle'>Login or Create an Account</h1>
            <SignupForm />
        </section >
    );
}

export default SignupPage;