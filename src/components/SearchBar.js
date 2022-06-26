import classes from '../styles/SearchBar.module.css';

const SearchBar = () => {
    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <input type='search' placeholder='What are you looking for...' className={`searchbar ${classes.searchbar}`} />
                <button className={`themegreenbutton ${classes.search_button}`}>
                    <img alt='Search Icon' src='/images/search.svg' />
                    <p>Search</p>
                </button>
                <button className={`themepinkbutton ${classes.cancel_button}`}>Cancel</button>
            </div>
        </section>
    );
};

export default SearchBar;