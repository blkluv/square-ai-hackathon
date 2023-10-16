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
import CreateLayout from "./components/CreateLayout";
import LayoutManagement from "./components/LayoutManagement"
import layoutsDashboard from "./pages/layoutsDashboard";
import LayoutsDashboard from "./pages/layoutsDashboard";
import Redirect from "./components/redirect";
import UserGraph from "./components/UserGraph";
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
        <Route path="/createLayout" element={<CreateLayout />}></Route>
        <Route path="/layoutmanagement" element={<LayoutManagement />}></Route>
        <Route path="/layouts" element={<LayoutsDashboard />} />
        <Route path="/callback" element={<Redirect />} />
        <Route path="/usergraphs" element={<UserGraph />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
