import { useEffect, useRef, useState } from "react";
import { category } from "../models/category";
import { ToastContainer, toast } from 'react-toastify';

function ManageCategories() {

    const [kategooriad, setKategooriad] = useState<category[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(json => setKategooriad(json))
    }, []);

    const deleteCategory = (id: number) => {
        fetch(`http://localhost:8080/categories/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(json => {
                if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                    setKategooriad(json)
                    toast.success("Kategooria kustutatud");
                } else {
                    toast.error(json.message);
                }
            })
    };

    const addCategory = () => {
        const newCategory = {
            name: nameRef.current?.value,
            active: activeRef.current?.checked,
        }
        fetch(`http://localhost:8080/categories`, {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                    setKategooriad(json)
                    toast.success("Uus kategooria lisatud");
                    if (nameRef.current && activeRef.current) {
                        nameRef.current.value = "";
                        activeRef.current.checked = false;
                    }
                } else {
                    toast.error(json.message);
                }
            })
    }

    const nameRef = useRef<HTMLInputElement>(null);
    const activeRef = useRef<HTMLInputElement>(null);

    return (

        <div>
            <h2>Manage Categories</h2>

            <label>Name</label> <br />
            <input placeholder="Lisa Kategooria" ref={nameRef} type="text" /> <br />
            <label htmlFor="activeCheck">Active</label>
            <input id="activeCheck" ref={activeRef} type="checkbox" /> <br />
            <button onClick={() => addCategory()}>Save Category</button> <br />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {kategooriad.map((kategooria) => (
                        <tr key={kategooria.id}>
                            <td>{kategooria.id}</td>
                            <td>{kategooria.name}</td>
                            <td>{kategooria.active ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => deleteCategory(kategooria.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default ManageCategories