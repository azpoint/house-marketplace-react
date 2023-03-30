import { useNavigate, useLocation } from "react-router-dom";

//Assets
import ExploreIcon from "./Interface/ExploreIcon";
import OfferIcon from "./Interface/OfferIcon";
import ProfileIcon from "./Interface/ProfileIcon";

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate("/")}>
                    <ExploreIcon fill={pathMatchRoute('/') ? "#009b40" : "#8f8f8f"} width="36px" height="36px" />
                    <p className={pathMatchRoute("/") ? "navbarListItemNameActive" : "navbarListItemName"}>Explore</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate("/offers")}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? "#009b40" : "#8f8f8f"} width="36px" height="36px" />
                    <p className={pathMatchRoute("/offers") ? "navbarListItemNameActive" : "navbarListItemName"}>Offers</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate("/profile")}>
                    <ProfileIcon fill={pathMatchRoute('/profile') ? "#009b40" : "#8f8f8f"} width="36px" height="36px" />
                    <p className={pathMatchRoute("/profile") ? "navbarListItemNameActive" : "navbarListItemName"}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}
export default Navbar