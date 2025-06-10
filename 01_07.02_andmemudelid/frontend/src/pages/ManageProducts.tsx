import { useEffect, useRef, useState } from "react";
import { product } from "../models/products";
import { category } from "../models/category";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function ManageProducts() {

    const [products, setProducts] = useState<product[]>([]);
    const [categories, setCategories] = useState<category[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(json => setProducts(json))
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
    }, []);

    const deleteProduct = (id: number) => {
        fetch(`http://localhost:8080/products/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(json => setProducts(json));     //TODO: on vaja ka teha toast lisata siia
    };

    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const activeRef = useRef<HTMLInputElement>(null);

    const addProduct = () => {
        const newProduct = {
            name: nameRef.current?.value,
            price: Number(priceRef.current?.value),  //kui on numbriline väärtus siis peaks Number() välja panema
            image: imageRef.current?.value,
            active: activeRef.current?.checked,  // kui on checkbox, siis .value ei sobi
            category: { "id": Number(categoryRef.current?.value) },
        }
        fetch(`http://localhost:8080/products`, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                    setProducts(json)
                    toast.success("Uus toode lisatud");
                } else {
                    toast.error(json.message);
                }
            })
    }

    return (
        <div>
            <h2>Manage Products</h2>

            <label>Name</label> <br />
            <input placeholder="Lisa toode" ref={nameRef} type="text" /> <br />
            <label>Price</label><br />
            <input placeholder="Lisa Hind" ref={priceRef} type="number" /> <br />
            <label>Category</label> <br />
            {/* <input ref={categoryRef} type="number" /><br /> */}
            <select ref={categoryRef}>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select> <br />
            <label>Image</label> <br />
            <input ref={imageRef} type="text" /> <br />
            <label>Active</label> <br />
            <input ref={activeRef} type="checkbox" /> <br />
            <button onClick={() => addProduct()}>Add Product</button> <br />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Active</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}€</td>
                            <td>{product.category?.name}</td>
                            <td>{product.active ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                            <td>
                                <Link to={"/admin/edit-product/" + product.id}>
                                    <button> Muuda </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}
export default ManageProducts;