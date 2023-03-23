//Dependencies
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

// Interface Components
import ArrowRightIcon from "../components/Interface/ArrowRightIcon";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                navigate("/");
            }
        } catch (error) {
          toast.error("Bad User Credentials")
        }

    };

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <form onSubmit={onSubmit}>
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
                            onClick={() =>
                                setShowPassword((prevState) => !prevState)
                            }
                        />
                    </div>

                    <Link to="/forgot-password" className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signInBar">
                        <p className="signInText">Sign In</p>
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill="#00cc66"
                                width="34px"
                                height="34px"
                            />
                        </button>
                    </div>
                </form>

                {/* Google OAuth */}

                <Link to="/sign-up" className="registerLink">
                    Sign Up instead
                </Link>
            </div>
        </>
    );
}
export default SignIn;
