// Dependencies
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";


// Pages
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/ForgotPassword";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore/>} />
          <Route path="/offers" element={<Offers/>} />
          <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>

        <Navbar />

      </Router>

      <ToastContainer position="bottom-center" autoClose={3000} theme="colored"/>
    </>
  )
}

export default App
