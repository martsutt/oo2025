import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Athlete } from "../models/athlete";
import { Result } from "../models/result";
import Table from "react-bootstrap/Table";
import { useTranslation } from 'react-i18next';

function AthleteDetails() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [athlete, setAthlete] = useState<Athlete | null>(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");

    const [results, setResults] = useState<Result[]>([]);
    const [totalScore, setTotalScore] = useState<number>(0);

    useEffect(() => {
        fetch(`http://localhost:8080/athletes?size=1000`)
            .then(res => res.json())
            .then(data => {
                const found = data.content.find((a: Athlete) => a.id === Number(id));
                setAthlete(found);
                setName(found?.name ?? "");
                setAge(found?.age?.toString() ?? "");
                setCountry(found?.country ?? "");
            });
        fetch(`http://localhost:8080/results/athlete/${id}`)
            .then(res => res.json())
            .then(setResults);
        fetch(`http://localhost:8080/results/athlete/${id}/totalscore`)
            .then(res => res.json())
            .then(setTotalScore);
    }, [id]);

    function save(e: React.FormEvent) {
        e.preventDefault();
        fetch(`http://localhost:8080/athletes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...athlete,
                name,
                age: Number(age),
                country
            })
        })
            .then(res => res.json())
            .then(() => navigate("/athletes"));
    }

    if (!athlete) return <div>Laadimine...</div>;

    return (
        <div>
            <h2>{t("Sportlaste andmete haldus")}</h2>
            <form onSubmit={save}>
                <input value={name} onChange={e => setName(e.target.value)} required />
                <input value={age} type="number" onChange={e => setAge(e.target.value)} required />
                <input value={country} onChange={e => setCountry(e.target.value)} required />
                <button type="submit">{t("Salvesta")}</button>
            </form>
            <h3>{t("Tulemused")}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t("Võistlusala")}</th>
                        <th>{t("Punktid")}</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(r => (
                        <tr key={r.id}>
                            <td>{r.event.name}</td>
                            <td>{r.score}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><b>{t("Kogusumma")}</b></td>
                        <td><b>{totalScore ?? 0}</b></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default AthleteDetails;