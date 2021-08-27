import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './ProductList.css';


const ListProducts = () => {

    const products: any = useSelector<any>(s => s.products)
    console.log(products)
    return (
        <div className='product-table'>
            <h1 style={{fontFamily: 'system-ui'}}>Products List</h1>
        <div className='tablediv'>
            <table>
                <tr style={{ backgroundColor:'#bcbdf1'}}>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Price</td>
                    <td>Stock</td>
                    <td>Brand</td>
                    <td>Edit</td>
                </tr>

                {
                    products?.map((p: any) =>
                        <tr>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>${p.price}</td>
                            <td>{p.stock}</td>
                            <td>{p.brand.name}</td>
                            <td><Link style={{ textDecoration: 'none', color:'black' }} to={`/product/${p.id}`}>Edit</Link></td>
                        </tr>
                    )
                }

            </table>
            </div>
        </div>
    )
}

export default ListProducts;
