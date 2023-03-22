// Dependencies
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Components
import Navbar from "./components/Navbar";


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
          <Route path="/profile" element={<SignIn/>} />
          <Route path="/sig-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>

        <Navbar />

      </Router>
    </>
  )
}

export default App