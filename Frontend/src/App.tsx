import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateMenu from "./pages/CreateMenu";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-menu" element={<CreateMenu />} />
        <Route path="/edit-menu/:id" element={<CreateMenu />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
