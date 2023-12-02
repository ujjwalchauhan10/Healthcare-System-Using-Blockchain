import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
function App() {
  return (
    <div className="bg-[#f8f8f8] w-full bg-cover bg-center">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
