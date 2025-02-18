import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
