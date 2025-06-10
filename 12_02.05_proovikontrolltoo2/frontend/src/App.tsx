import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WordList from "./components/WordList";
import WordPage from "./components/WordPage";
import ManagerList from "./components/ManagerList";
import ManagerPage from "./components/ManagerPage";

function App() {
  return (
    <Router>
      <div>
        <h1>Sõnad ja tähendused</h1>
        <Routes>
          <Route path="/" element={<WordList />} />
          <Route path="/word/:id" element={<WordPage />} />
          <Route path="/managers" element={<ManagerList />} />
          <Route path="/manager/:id" element={<ManagerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;