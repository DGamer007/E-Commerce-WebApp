import classes from '../styles/ProductForm.module.css';

function ProductForm() {
    return (
        <form onSubmit={e => e.preventDefault()} className={classes.section}>
            <div className='h_fields'>
                <div className='formfield'>
                    <label htmlFor='fname'>First Name *</label>
                    <input type='text' id='fname' />
                </div>
                <div className='formfield'>
                    <label htmlFor='lname'>Last Name *</label>
                    <input type='text' id='lname' />
                </div>
            </div>

            <div className='h_fields'>
                <div className='formfield'>
                    <label htmlFor='category'>Shop by Categories</label>
                    <input type='text' id='category' />
                </div>
                <div className='formfield'>
                    <label htmlFor='desc'>Description</label>
                    <input type='text' id='desc' />
                </div>
            </div>

            <div className={classes.fileinput_container}>
                <input type='file' className={classes.fileinput} />
            </div>

            <div className={classes.buttons}>
                <button className='themegreenbutton'>Save</button>
                <button className='themepinkbutton'>Cancel</button>
            </div>
        </form>
    );
}

export default ProductForm;