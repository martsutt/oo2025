import { useEffect, useState } from "react";
import { Todo } from "../models/todo";
import TodoAdd from "./TodoAdd";

function TodoList({ userId }: { userId: number }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/todo/user/${userId}`)
                .then(res => res.json())
                .then(json => setTodos(json));
        }
    }, [userId]);

    const handleSearch = () => {
        fetch(`http://localhost:8080/todo/user/${userId}/search?title=${search}`)
            .then(res => res.json())
            .then(json => setTodos(json));
    };

    const handleAdd = () => {
        fetch(`http://localhost:8080/todo/user/${userId}`)
            .then(res => res.json())
            .then(json => setTodos(json));
    };

    const toggleCompleted = (todo: Todo) => {
        fetch("http://localhost:8080/edit-todo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...todo, completed: !todo.completed, user: { id: userId } })
        }).then(() => {
            setTodos(todos =>
                todos.map(t =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                )
            );
        });
    };

    const tegemata = todos.filter(todo => !todo.completed);
    const tehtud = todos.filter(todo => todo.completed);

    if (!userId) return null;

    return (
        <div>
            <TodoAdd onAdd={handleAdd} userId={userId} />
            <div className="todo-search">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Otsi todo-si"
                />
                <button onClick={handleSearch}>Otsi</button>
            </div>
            <div className="todo-columns">
                <div className="todo-column">
                    <h2>Tegemata</h2>
                    <ul className="todo-list">
                        {tegemata.map(todo =>
                            <li key={todo.id}>
                                {todo.title}
                                <button style={{ marginLeft: 8 }} onClick={() => toggleCompleted(todo)}>
                                    ✅
                                </button>
                                {/* <button style={{ marginLeft: 8 }} onClick={() => toggleCompleted(todo)}>
                                    Märgi tehtuks
                                </button> */}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="todo-column">
                    <h2>Tehtud</h2>
                    <ul className="todo-list">
                        {tehtud.map(todo =>
                            <li key={todo.id}>
                                {todo.title}
                                <button style={{ marginLeft: 8 }} onClick={() => toggleCompleted(todo)}>
                                    ↩️
                                </button>
                                {/* <button style={{ marginLeft: 8 }} onClick={() => toggleCompleted(todo)}>
                                    Tühista tehtuks märkimine
                                </button> */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoList;