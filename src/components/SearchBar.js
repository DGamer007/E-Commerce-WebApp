import classes from '../styles/SearchBar.module.css';

function SearchBar() {
    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <input type='search' placeholder='What are you looking for...' className={classes.searchbar} />
                <button className={classes.search_button}>
                    <img src='/images/search.svg' />
                    <p>Search</p>
                </button>
                <button className={classes.cancel_button}>Cancel</button>
            </div>
        </section>
    );
}

export default SearchBar;