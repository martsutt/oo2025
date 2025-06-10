import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Word } from "../models/Word";


export default function WordPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [word, setWord] = useState<Word | null>(null);
    const [editWord, setEditWord] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/words/${id}`)
            .then((res) => res.json())
            .then(data => {
                setWord(data);
                setEditWord(data.word);
                setEditDescription(data.description);
            });
    }, [id]);

    if (!word) return <div>Laadimine...</div>;

    const updateWord = () => {
        fetch(`http://localhost:8080/words`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: word.id, word: editWord, description: editDescription }),
        })
            .then((res) => res.json())
            .then(updated => {
                setWord(updated);
                alert("Muudatus sisse viidud");
                navigate("/");
            });
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Tagasi</button>
            <h2>{word.word}</h2>
            <p>{word.description}</p>
            <h3>Muuda sõna või tähendust</h3>
            <input
                value={editWord}
                onChange={e => setEditWord(e.target.value)}
                placeholder="Sõna"
            />
            <input
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Tähendus"
            />
            <button onClick={updateWord}>Salvesta muudatused</button>
            <br />
        </div>
    );
}