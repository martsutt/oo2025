import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../models/products";

function SingleProduct() {
    //kui on kaks väärtust, nt productId ka --> const{productId, categoryId}=useParams

    const { productId } = useParams();
    const [product, setProduct] = useState<product>();

    useEffect(() => {
        fetch("http://localhost:8080/products/" + productId)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [productId]);

    return (
        <div>
            <h1>Single product</h1>

            <div>
                <div>Nimi: {product?.name}</div>
                <div>Hind: {product?.price}</div>
                <div>Kategooria: {product?.category?.name}</div>
                <img src={product?.image} alt="" />
            </div>
        </div>
    )
}

export default SingleProduct