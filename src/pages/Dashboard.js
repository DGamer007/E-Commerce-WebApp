import ProductItems from '../components/ProductItems';

function Dashboard() {
    return (
        <section className='pagesection'>
            <h1 className='pagetitle_without_bc'>Product Listing</h1>
            <ProductItems />
        </section>
    );
}

export default Dashboard;