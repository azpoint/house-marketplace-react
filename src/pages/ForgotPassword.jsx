import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import ArrowRightIcon from "../components/Interface/ArrowRightIcon";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
          const auth =getAuth()
          await sendPasswordResetEmail(auth, email)
          toast.success("email was sent")
        } catch (error) {
          toast.error("Could not send reset email")
        }
    };

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>

            <main className="my-8">
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />

                    <Link className="forgotPasswordLink" to="/sign-in">
                        Sign In
                    </Link>

                    <div className="signInBar">
                        <div className="signInText">Send Reset Link</div>
                        <button className="signInButton">
                            <ArrowRightIcon width="34px" height="34px" />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
export default ForgotPassword;
