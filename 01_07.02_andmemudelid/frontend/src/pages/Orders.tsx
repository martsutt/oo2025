import { useEffect, useState } from "react";
import { orders } from "../models/orders";

function Orders() {
    const [orders, setOrders] = useState<orders[]>([]);  //viisakas panna order ( ainsuses ja suure tähega )!!!

    useEffect(() => {
        fetch("http://localhost:8080/orders")
            .then((res) => res.json())
            .then(json => setOrders(json))
    }, []);

    return (
        <>
            <h1>Orders</h1>
            <div className="ordersContainer">
                {orders.map(order =>
                    <div key={order.id} id="orderContainer">
                        <div>ID: {order.id}{order.products?.map(product =>
                            <div key={product.id}>
                                <div> Toode: {product.name}, Hind: {product.price}€</div>
                            </div>
                        )}</div>
                        <div>Kuupäev: {order.date?.toString()}</div>
                        <div>Total: {order.totalSum}€</div>
                    </div>)}

            </div>
        </>
    )
}

export default Orders