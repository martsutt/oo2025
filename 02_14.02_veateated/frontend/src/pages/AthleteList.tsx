import { useEffect, useState } from "react";
import { Athlete } from "../models/athlete";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function AthleteList() {
    const { t } = useTranslation();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [country, setCountry] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newCountry, setNewCountry] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/athletes/countries")
            .then(res => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        let url = `http://localhost:8080/athletes?page=${page}&size=5`;
        if (country) {
            url += `&country=${country}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAthletes(data.content);
                setTotalPages(data.totalPages);
            });
    }, [country, page]);

    function addAthlete(e: React.FormEvent) {
        e.preventDefault();
        fetch("http://localhost:8080/athletes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newName,
                age: Number(newAge),
                country: newCountry,
                active: true
            })
        })
            .then(res => res.json())
            .then(() => {
                setNewName("");
                setNewAge("");
                setNewCountry("");
                let url = `http://localhost:8080/athletes?page=${page}&size=5`;
                if (country) url += `&country=${country}`;
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        setAthletes(data.content);
                        setTotalPages(data.totalPages);
                    });
            });
    }

    return (
        <div>
            <h2>{t("Sportlased")}</h2>
            <form onSubmit={addAthlete} style={{ marginBottom: "1em" }}>
                <input
                    type="text"
                    placeholder={t("Nimi")}
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder={t("Vanus")}
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder={t("Riik")}
                    value={newCountry}
                    onChange={e => setNewCountry(e.target.value)}
                    required
                />
                <button type="submit">{t("Lisa sportlane")}</button>
            </form>
            <div style={{ marginBottom: "1em" }}>
                <select value={country} onChange={e => { setCountry(e.target.value); setPage(0); }}>
                    <option value="">{t("Kõik riigid")}</option>
                    {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("Nimi")}</th>
                        <th>{t("Vanus")}</th>
                        <th>{t("Riik")}</th>
                        <th>{t("Haldus")}</th>
                    </tr>
                </thead>
                <tbody>
                    {athletes.map((athlete) => (
                        <tr key={athlete.id}>
                            <td>{athlete.id}</td>
                            <td>{athlete.name}</td>
                            <td>{athlete.age}</td>
                            <td>{athlete.country}</td>
                            <td>
                                <button onClick={() => navigate(`/athletes/${athlete.id}`)}>
                                    {t("Vaata/Muuda")}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>{"< "}</button>
                <span> {t("Leht")} {page + 1} / {totalPages} </span>
                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>{">"}</button>
            </div>
        </div>
    );
}

export default AthleteList;