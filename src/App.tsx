import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteIdPage from "./pages/NoteIdPage"; // <- updated name

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/n/:noteId" element={<NoteIdPage />} />
    </Routes>
  );
}

export default App;