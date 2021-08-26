import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ListProducts = () => {

    const products: any = useSelector<any>(s => s.products)
    console.log(products)
    return (
        <>
            <h1>Listado de products</h1>

            <table>
                <tr>
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
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
                            <td>{p.brand.name}</td>
                            <td><Link to={`/product/${p.id}`}>Edit</Link></td>
                        </tr>
                    )
                }

            </table>
        </>
    )
}

export default ListProducts;
