import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import { fetchAPI } from '../utils/dataFetching';
import classes from '../styles/ProductForm.module.css';

function ProductForm({ isEdit = false }) {

    const [alert, setAlert] = useState({ isOpen: false });
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            image && formData.append('image', image);
            formData.append('title', title);
            formData.append('subtitle', subtitle);
            formData.append('categories', categories);
            formData.append('description', description);

            const requestObject = {
                method: isEdit ? 'PATCH' : 'POST',
                url: `${isEdit ? 'update' : 'create'}/product`,
                body: formData,
                isFormData: true
            };

            const { data, message, status } = await fetchAPI(requestObject);

            setAlert({
                isOpen: true,
                type: 'success',
                message
            });
        } catch (err) {
            setAlert({
                isOpen: true,
                type: 'error',
                message: err.message
            });
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={classes.section}>
                <div className='h_fields'>
                    <div className='formfield'>
                        <label htmlFor='title'>Product Title *</label>
                        <input
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            id='title'
                            required />
                    </div>
                    <div className='formfield'>
                        <label htmlFor='author'>Product Subtitle *</label>
                        <input
                            type='text'
                            value={subtitle}
                            onChange={e => setSubtitle(e.target.value)}
                            id='subtitle'
                            required />
                    </div>
                </div>

                <div className='h_fields'>
                    <div className='formfield'>
                        <label htmlFor='categories'>Shop by Categories</label>
                        <input
                            type='text'
                            value={categories}
                            onChange={e => setCategories(e.target.value)}
                            id='categories' />
                    </div>
                    <div className='formfield'>
                        <label htmlFor='desc'>Description</label>
                        <input
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            id='desc' />
                    </div>
                </div>

                <div className={classes.fileinput_container}>
                    <input
                        type='file'
                        name='image'
                        onChange={e => setImage(e.target.files?.[0])}
                        className={classes.fileinput}
                        required={!isEdit} />
                </div>

                <div className={classes.buttons}>
                    <button
                        type='submit'
                        className='themegreenbutton'>
                        Save
                    </button>
                    <button
                        type='reset'
                        onClick={() => { navigate(-1); }}
                        className='themepinkbutton'>
                        Cancel
                    </button>
                </div>
            </form>
            <Snackbar
                open={alert.isOpen}
                autoHideDuration={4000}
                onClose={e => setAlert({ isOpen: false })}>
                <Alert
                    onClose={e => setAlert({ isOpen: false })}
                    severity={alert.type}
                    sx={{ width: '100%' }} >
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ProductForm;