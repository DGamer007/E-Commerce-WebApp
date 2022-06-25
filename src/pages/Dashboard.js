import ProductItems from '../components/ProductItems';

const Dashboard = () => {
    return (
        <section className='pagesection'>
            <h1 className='pagetitle_without_bc'>Product Listing</h1>
            <ProductItems />
        </section>
    );
};

export default Dashboard;