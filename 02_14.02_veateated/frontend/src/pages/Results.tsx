import { useEffect, useState } from "react";
import { Athlete } from "../models/athlete";
import { Result } from "../models/result";
import { Event } from "../models/event";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Results() {
    const { t } = useTranslation();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [totalScore, setTotalScore] = useState<number | null>(null);

    const [eventId, setEventId] = useState<number | null>(null);
    const [rawScore, setRawScore] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/athletes?size=50")
            .then(res => res.json())
            .then(data => setAthletes(data.content));
        fetch("http://localhost:8080/events")
            .then(res => res.json())
            .then(setEvents);
    }, []);

    useEffect(() => {
        if (selectedId !== null) {
            fetch(`http://localhost:8080/results/athlete/${selectedId}`)
                .then(res => res.json())
                .then(setResults);

            fetch(`http://localhost:8080/results/athlete/${selectedId}/totalscore`)
                .then(res => res.json())
                .then(setTotalScore);
        }
    }, [selectedId]);

    function addResult(e: React.FormEvent) {
        e.preventDefault();
        if (selectedId && eventId && rawScore) {
            fetch("http://localhost:8080/results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    athlete: { id: selectedId },
                    event: { id: eventId },
                    score: Number(rawScore)
                })
            })
                .then(res => res.json())
                .then(() => {
                    setRawScore("");
                    fetch(`http://localhost:8080/results/athlete/${selectedId}`)
                        .then(res => res.json())
                        .then(setResults);
                    fetch(`http://localhost:8080/results/athlete/${selectedId}/totalscore`)
                        .then(res => res.json())
                        .then(setTotalScore);
                });
        }
    }

    return (
        <div>
            <h2>{t("Sportlaste tulemused")}</h2>
            <select onChange={e => setSelectedId(Number(e.target.value))} defaultValue="">
                <option value="" disabled>Vali sportlane</option>
                {athletes.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                ))}
            </select>
            {selectedId && (
                <form onSubmit={addResult} style={{ margin: "1em 0" }}>
                    <select required value={eventId ?? ""} onChange={e => setEventId(Number(e.target.value))}>
                        <option value="" disabled>{t("Võistlusala")}</option>
                        {events.map(ev => (
                            <option key={ev.id} value={ev.id}>{ev.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder={t("Tulemus")}
                        value={rawScore}
                        onChange={e => setRawScore(e.target.value)}
                        required
                    />
                    <button type="submit">{t("Lisa sportlane")}</button>
                </form>
            )}
            {selectedId && (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>{t("Võistlusala")}</th>
                                <th>{t("Punktid")}</th>
                                <th>{t("Haldus")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r.id}>
                                    <td>{r.event.name}</td>
                                    <td>{r.score}</td>
                                    <td>
                                        <button onClick={() => navigate(`/results/${r.id}`)}>
                                            {t("Vaata")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td><b>{t("Kogusumma")}</b></td>
                                <td><b>{totalScore ?? 0}</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default Results;
