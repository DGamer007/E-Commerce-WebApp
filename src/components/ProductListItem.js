import classes from '../styles/ProductListItem.module.css';

function ProductListItem({ product }) {
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.dataSource}</td>
            <td>{product.query}</td>
            <td className={classes.buttoncontainer}>
                <button>
                    Edit
                </button>
                <button>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default ProductListItem;