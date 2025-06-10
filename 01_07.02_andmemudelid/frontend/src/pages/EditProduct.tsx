import { useEffect, useRef, useState } from "react";
import { category } from "../models/category";
import { useNavigate, useParams } from "react-router-dom";
import { product } from "../models/products";

function EditProduct() {

    const { productId } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const activeRef = useRef<HTMLInputElement>(null);
    const [categories, setCategories] = useState<category[]>([]);
    const [product, setProduct] = useState<product>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/products/" + productId)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [productId]);

    const editProduct = () => {
        const editedProduct = {
            id: productId,
            name: nameRef.current?.value,
            price: Number(priceRef.current?.value),  //kui on numbriline väärtus siis peaks Number() välja panema
            image: imageRef.current?.value,
            active: activeRef.current?.checked,  // kui on checkbox, siis .value ei sobi
            category: { "id": Number(categoryRef.current?.value) },
        }
        fetch("http://localhost:8080/products", {
            method: "PUT",
            body: JSON.stringify(editedProduct),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(json => {  //ERROR peaks olema samasugune mis eelmine, nö käekiri peab koodi kirjutamisel sama olema.
                if (json.message && json.timestamp && json.status) {
                    alert(json.message)
                } else {
                    navigate("/admin/products");
                }
            })
    }

    if (product === undefined) {
        return <div>Page not found</div>
    }

    return (
        <div>
            <h1>Edit product</h1>

            <label>Name</label> <br />
            <input ref={nameRef} defaultValue={product?.name} type="text" /> <br />
            <label>Price</label><br />
            <input ref={priceRef} defaultValue={product?.price} type="number" /> <br />
            <label>Category</label> <br />
            {/* <input ref={categoryRef} type="number" /><br /> */}
            <select ref={categoryRef} defaultValue={product.category.id}>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select> <br />
            <label>Image</label> <br />
            <input ref={imageRef} type="text" /> <br />
            <label>Active</label> <br />
            <input ref={activeRef} defaultChecked={product?.active} type="checkbox" /> <br />
            <button onClick={() => editProduct()}>Edit product</button> <br />
        </div>
    )
}

export default EditProduct