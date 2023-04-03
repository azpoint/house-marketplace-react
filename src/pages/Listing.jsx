import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { register } from "swiper/element/bundle";

import Spinner from "../components/Spinner";
import ShareIcon from "../components/Interface/ShareIcon";

register();

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const swiperElRef = useRef(null);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
            }
        };
        fetchListing();

        if (listing) {
            swiperElRef.current.addEventListener("progress", (e) => {
                const [swiper, progress] = e.detail;
            });

            swiperElRef.current.addEventListener("slidechange", (e) => {});
        }
    }, []);

    return (
        <main>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <swiper-container
                        speed="500"
                        loop="true"
                        navigation="true"
                        pagination="true"
                        effect="fade"
                        ref={swiperElRef}
                    >
                        {listing.imageUrls.map((image, index) => (
                            <swiper-slide key={index}>
                                <img src={image} style={{objectFit: "cover", height: "30vw", minHeight: "225px", width: "100%"}}/>
                                
                            </swiper-slide>
                        ))}
                    </swiper-container>

                    <div
                        className="shareIconDiv"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setShareLinkCopied(true);
                            setTimeout(() => {
                                setShareLinkCopied(false);
                            }, 2000);
                        }}
                    >
                        <ShareIcon />
                    </div>

                    {shareLinkCopied && (
                        <p className="linkCopied">Link Copied</p>
                    )}

                    <div className="listingDetails">
                        <p className="listingName">
                            {listing.name} - $
                            {listing.offer
                                ? listing.discountedPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : listing.regularPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>

                        <p className="listingLocation">{listing.location}</p>
                        <p className="listingType">
                            For {listing.type === "rent" ? "Rent" : "Sale"}
                        </p>
                        {listing.offer && (
                            <p className="discountPrice">
                                $
                                {listing.regularPrice - listing.discountedPrice}{" "}
                                discount
                            </p>
                        )}

                        <ul className="listingDetailsList">
                            <li>
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} Bedrooms`
                                    : "1 Bedroom"}
                            </li>
                            <li>
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} Bathrooms`
                                    : "1 Bathroom"}
                            </li>
                            <li>{listing.parking && "Parking Spot"}</li>
                            <li>{listing.furnished && "Furnished"}</li>
                        </ul>

                        <p className="listingLocationTitle">Location</p>

                        <div className="leafletContainer">
                            <MapContainer
                                style={{ height: "100%", width: "100%" }}
                                center={[
                                    listing.geolocation.lat,
                                    listing.geolocation.lng,
                                ]}
                                zoom={13}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                                />

                                <Marker
                                    position={[
                                        listing.geolocation.lat,
                                        listing.geolocation.lng,
                                    ]}
                                >
                                    <Popup>{listing.location}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        {auth.currentUser?.uid !== listing.userRef && (
                            <Link
                                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                                className="primaryButton"
                            >
                                Contact Landlord
                            </Link>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}
export default Listing;
