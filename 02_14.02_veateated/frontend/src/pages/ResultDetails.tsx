import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Result } from "../models/result";

function ResultDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState<Result | null>(null);
    const [score, setScore] = useState("");
    const [athleteInfo, setAthleteInfo] = useState("");
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/results/${id}`)
            .then(res => res.json())
            .then(data => {
                setResult(data);
                setScore(data.score?.toString() ?? "");
                setEventName(data.event?.name ?? "");
                setAthleteInfo(
                    data.athlete
                        ? `${data.athlete.name}, vanus: ${data.athlete.age}, riik: ${data.athlete.country}`
                        : ""
                );
            });
    }, [id]);

    function save(e: React.FormEvent) {
        e.preventDefault();
        fetch(`http://localhost:8080/results/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...result,
                score: Number(score)
            })
        })
            .then(res => res.json())
            .then(() => navigate("/results"));
    }

    if (!result) return <div>Laadimine...</div>;

    return (
        <div>
            <h2>Tulemuse detailid ja muutmine</h2>
            <div>
                <b>Võistlusala:</b> {eventName}<br />
                <b>Sportlane:</b> {athleteInfo}
            </div>
            <form onSubmit={save}>
                <input
                    value={score}
                    type="number"
                    onChange={e => setScore(e.target.value)}
                    required
                />
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
}

export default ResultDetails;