import { useEffect, useState } from "react";
import { Event } from "../models/event";
import Table from "react-bootstrap/Table";
import { useTranslation } from 'react-i18next';

function EventList() {
    const { t } = useTranslation();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/events")
            .then((res) => res.json())
            .then(json => setEvents(json))
    }, []);

    return (
        <div>
            <h2>{t("Võistlusalad")}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t("ID")}</th>
                        <th>{t("Nimi")}</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EventList;