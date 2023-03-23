import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { db } from "../firebase.config"
import { doc,setDoc,serverTimestamp} from "firebase/firestore"
import { toast } from "react-toastify";


// Interface Components
import ArrowRightIcon from "../components/Interface/ArrowRightIcon";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
      setFormData( prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    };

    const onSubmit = async (e) => {
      e.preventDefault()

      try {
        const auth = getAuth()

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        updateProfile(auth.currentUser,{
          displayName: name
        })

        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, "users", user.uid), formDataCopy)

        navigate("/")

      } catch (error) {
        toast.error("Something went wrong during registry")
      }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <form onSubmit={onSubmit}>
                <input
                        type="text"
                        name=""
                        id="name"
                        className="nameInput"
                        placeholder="Name"
                        value={name}
                        onChange={onChange}
                    />
                
                    <input
                        type="email"
                        name=""
                        id="email"
                        className="emailInput"
                        placeholder="email"
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                        />
                        <img
                            src={VisibilityIcon}
                            alt=""
                            className="showPassword"
                            onClick={() => setShowPassword( prevState => !prevState)}
                        />
                    </div>

                    <Link to="/forgot-password" className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                      <p className="signUpText">Sign Up</p>
                      <button className="signUpButton"><ArrowRightIcon fill="#00cc66" width="34px" height="34px"/></button>
                    </div>

                </form>

                {/* Google OAuth */}

                <Link to="/sign-up" className="registerLink">
                  Sign In instead
                </Link>

            </div>
        </>
    );
}
export default SignUp;
