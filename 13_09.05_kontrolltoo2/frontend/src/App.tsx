import { useState } from "react";
import UserList from "./components/UserList";
import TodoList from "./components/TodoList";

function App() {
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string } | null>(null);

  return (
    <div>
      <h1>Todo</h1>
      <UserList onSelect={setSelectedUser} />
      {selectedUser && (
        <TodoList userId={selectedUser.id} />
      )}
    </div>
  );
}

export default App;