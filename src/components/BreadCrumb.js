import classes from '../styles/BreadCrumb.module.css';

function BreadCrumb({ location }) {
    return (
        <div className={classes.container}>
            <p>Home</p>
            <img src='/images/breadcrumb-arrow.svg' />
            <p>{location}</p>
        </div>
    );
}

export default BreadCrumb;