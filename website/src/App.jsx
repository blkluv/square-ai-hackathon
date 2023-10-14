import { useState } from "react";
import "babel-polyfill";
import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SellerOverview from "./components/SellerOverview";
import Messages from "./components/Messages";
import Docs from "./components/Docs";
import Help from "./components/Help";
import layoutsDashboard from "./pages/layoutsDashboard";
import LayoutsDashboard from "./pages/layoutsDashboard";
// import Pag

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
        <Route path="/overview" element={<SellerOverview />} /> {/* Use `element` prop */}
        <Route path="/" element={<HomePage />} /> {/* Use `element` prop */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/layouts" element={<LayoutsDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
