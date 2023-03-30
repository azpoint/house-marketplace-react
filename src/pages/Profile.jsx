import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import ArrowRightIcon from "../components/Interface/ArrowRightIcon";
import HomeIcon from "../components/Interface/HomeIcon";

function Profile() {
    const auth = getAuth();

    const [changeDetails, setChangeDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate("/");
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                //Update display name in FB
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                //Update in FireStore
                const userRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userRef, { name: name });
            }
        } catch (error) {
            toast.error("Could not update profile details");
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" type="button" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <main >
                <div className="profileDetailsHeader my-4">
                    <p className="profileDetailsText">Profile Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            changeDetails && onSubmit();
                            setChangeDetails((prevState) => !prevState);
                        }}
                    >
                        {changeDetails ? "done" : "change"}
                    </p>
                </div>

                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={
                                !changeDetails
                                    ? "profileName"
                                    : "profileNameActive"
                            }
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className={
                                !changeDetails
                                    ? "profileEmail"
                                    : "profileEmailActive"
                            }
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>

                <Link to="/create-listing" className="createListing">
                    <HomeIcon />
                    <p>Sell or Rent your Home</p>
                    <ArrowRightIcon width="36px" height="36px" color="#00cc66"/>
                </Link>

            </main>
        </div>
    );
}
export default Profile;
