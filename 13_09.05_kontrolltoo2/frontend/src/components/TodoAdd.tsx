import { useRef } from "react";
import { Todo } from "../models/todo";

function TodoAdd({ onAdd, userId }: { onAdd: () => void; userId: number }) {
    const titleRef = useRef<HTMLInputElement>(null);

    const addTodo = () => {
        if (!userId) return;
        const newTodo: Todo = {
            title: titleRef.current?.value || "",
            completed: false,
            user: { id: userId }
        };
        fetch("http://localhost:8080/add-todo", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            onAdd();
            if (titleRef.current) titleRef.current.value = "";
        });
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <input
                ref={titleRef}
                placeholder="Lisa tegevus"
                style={{ flex: 1, minWidth: "200px" }}
            />
            <button onClick={addTodo}>Lisa tegevus</button>
        </div>
    );
}

export default TodoAdd;