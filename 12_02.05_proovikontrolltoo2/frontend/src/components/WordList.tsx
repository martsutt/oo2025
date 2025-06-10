import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Word } from "../models/Word";
import { Manager } from "../models/Manager";

export default function WordList() {
    const [words, setWords] = useState<Word[]>([]);
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [newWord, setNewWord] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [managers, setManagers] = useState<Manager[]>([]);
    const [selectedManagerId, setSelectedManagerId] = useState<number | "">("");

    useEffect(() => {
        fetch(`http://localhost:8080/words?page=${page}&size=3&sort=word&dir=${sortDir}`)
            .then((res) => res.json())
            .then(data => {
                setWords(data.content);
                setTotalPages(data.totalPages);
            });
    }, [sortDir, page]);

    useEffect(() => {
        fetch("http://localhost:8080/managers")
            .then(res => res.json())
            .then(setManagers);
    }, []);

    const addWord = () => {
        if (!newWord || !newDescription || !selectedManagerId) return;
        fetch("http://localhost:8080/words", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                word: newWord,
                description: newDescription,
                manager: { id: selectedManagerId }
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setNewWord("");
                setNewDescription("");
                setSelectedManagerId("");
                fetch(`http://localhost:8080/words?page=${page}&size=3&sort=word&dir=${sortDir}`)
                    .then((res) => res.json())
                    .then(data => {
                        setWords(data.content);
                        setTotalPages(data.totalPages);
                    });
            });
    };

    return (
        <div>
            <Link to="/managers">Vaata kõiki haldajaid</Link>
            <h2>Lisa uus sõna</h2>
            <input
                value={newWord}
                onChange={e => setNewWord(e.target.value)}
                placeholder="Sõna"
            />
            <input
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Tähendus"
            />
            <select
                value={selectedManagerId}
                onChange={e => setSelectedManagerId(Number(e.target.value))}
            >
                <option value="">Vali haldaja</option>
                {managers.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>
            <button onClick={addWord}>Lisa</button>
            <div>
                <button onClick={() => setSortDir("asc")}>A-Z</button>
                <button onClick={() => setSortDir("desc")}>Z-A</button>
            </div>
            <ul>
                {words.map((w) => (
                    <li key={w.id}>
                        <Link to={`/word/${w.id}`}>{w.word}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>Eelmine</button>
                <span> Leht {page + 1} / {totalPages} </span>
                <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Järgmine</button>
            </div>
        </div>
    );
}