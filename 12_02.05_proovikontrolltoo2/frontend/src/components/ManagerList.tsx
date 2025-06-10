import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Manager = {
    id: number;
    name: string;
    email: string;
};

export default function ManagerList() {
    const [managers, setManagers] = useState<Manager[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/managers")
            .then(res => res.json())
            .then(setManagers);
    }, []);

    return (
        <div>
            <button onClick={() => navigate(-1)}>Tagasi</button>
            <ul>
                {managers.map(m => (
                    <li key={m.id}>
                        <Link to={`/manager/${m.id}`}>{m.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}