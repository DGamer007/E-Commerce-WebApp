import classes from '../styles/Pagination.module.css';

const pages = [1, 2, 3, 4, 5, '...', 10];

function Pagination() {
    return (
        <div className={classes.section}>
            <img src='/images/breadcrumb-arrow.svg' />
            {
                pages.map(pageNumber => <span key={pageNumber}>{pageNumber}</span>)
            }
            <img src='/images/breadcrumb-arrow.svg' />
        </div>
    );
}

export default Pagination;