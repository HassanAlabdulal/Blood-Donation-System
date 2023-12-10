import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import Main from "./Components/Main";
// import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Main" element={<Main />} />
          {/* Define other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
