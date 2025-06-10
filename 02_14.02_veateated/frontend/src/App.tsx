import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AthleteList from "./pages/AthleteList";
import EventList from "./pages/EventList";
import KymnevoistlusMenu from "./components/Menu";
import Results from "./pages/Results";
import AthleteDetails from "./pages/AthleteDetails";
import ResultDetails from "./pages/ResultDetails";
import "./i18n";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      <KymnevoistlusMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/athletes" element={<AthleteList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/results" element={<Results />} />
        <Route path="/athletes/:id" element={<AthleteDetails />} />
        <Route path="/results/:id" element={<ResultDetails />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;
