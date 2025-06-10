import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
}

function UserList({ onSelect }: { onSelect: (user: User) => void }) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then(json => setUsers(json));
    }, []);

    return (
        <ul style={{ display: "flex", gap: "16px", listStyle: "none", padding: 0 }}>
            {users.map(user =>
                <li key={user.id}>
                    <button onClick={() => onSelect(user)}>{user.name}</button>
                </li>
            )}
        </ul>
    );
}

export default UserList;