import React from "react";
import Layout from "./Components/Layout"; // Import the Layout component
import HomePage from "./Components/HomePage"; // Import the HomePage component
import "./App.css";

function App() {
  return (
    <Layout>
      {/* Layout will automatically include Nav and Footer */}
      <HomePage /> {/* This is where you render the homepage content */}
    </Layout>
  );
}

export default App;
