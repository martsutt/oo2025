import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Word = { id: number; word: string; description: string; };
type Manager = { id: number; name: string; email: string; words: Word[] };

export default function ManagerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manager, setManager] = useState<Manager | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/managers/${id}`)
            .then(res => res.json())
            .then(setManager);
    }, [id]);

    if (!manager) return <div>Laadimine...</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Tagasi</button>
            <h2>{manager.name}</h2>
            <p>{manager.email}</p>
            <h3>Sõnad</h3>
            <ul>
                {(manager.words || []).map(w => (
                    <li key={w.id}>{w.word} – {w.description}</li>
                ))}
            </ul>
        </div>
    );
}