import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Payment from "./Components/Payment";
import PaymentsReport from "./Components/PaymentsReport";
import Policy from "./Components/Policy";
import LearnMore from "./Components/LearnMore";
import Main from "./Components/Main";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/PaymentsReport" element={<PaymentsReport />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/LearnMore" element={<LearnMore />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
