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
import ForgotPassword from "./Components/ForgotPassword";
import NewPassword from "./Components/NewPassword";
import Notification from "./Components/Notification";
import OperationsHistoryAdmin from "./Components/OperationsHistoryAdmin";
import ProcessRequest from "./Components/ProcessRequest";
import Reports from "./Components/Reports";
import ShowProfile from "./Components/ShowProfile";
import UsersEdit from "./Components/UsersEdit";
import AddCollectionDrive from "./Components/AddCollectionDrive";
import AggregatedAmountReport from "./Components/AggregatedAmountReport";
import BloodDonationsReport from "./Components/BloodDonationsReport";
import CollectionDriveReport from "./Components/CollectionDriveReport";
import EditProfileAdmin from "./Components/EditProfileAdmin";
import EditProfileUser from "./Components/EditProfileUser";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LearnMore" element={<LearnMore />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/PaymentsReport" element={<PaymentsReport />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/Notification" element={<Notification />} />
          <Route
            path="/OperationsHistoryAdmin"
            element={<OperationsHistoryAdmin />}
          />
          <Route path="/ProcessRequest" element={<ProcessRequest />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/ShowProfile" element={<ShowProfile />} />
          <Route path="/UsersEdit" element={<UsersEdit />} />
          <Route path="/AddCollectionDrive" element={<AddCollectionDrive />} />
          <Route
            path="/AggregatedAmountReport"
            element={<AggregatedAmountReport />}
          />
          <Route
            path="/BloodDonationsReport"
            element={<BloodDonationsReport />}
          />
          <Route
            path="/CollectionDriveReport"
            element={<CollectionDriveReport />}
          />
          <Route path="/EditProfileAdmin/:id" element={<EditProfileAdmin />} />
          <Route path="/EditProfileUser" element={<EditProfileUser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
