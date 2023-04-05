import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { register } from "swiper/element/bundle";
import { db } from "../firebase.config";

import Spinner from "./Spinner";

register();

function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();
    const swiperElRef = useRef(null);


    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, "listings");
            const q = query(
                listingsRef,
                orderBy("timestamp", "desc"),
                limit(5)
            );
            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        };

        fetchListings();

        if (!loading) {
            swiperElRef.current.addEventListener("progress", (e) => {
                const [swiper, progress] = e.detail;
            });

            swiperElRef.current.addEventListener("slidechange", (e) => {});
        }
    }, []);

    if(loading) {
        return <Spinner />
    }

    return listings && (
        <>
            <p className="exploreHeading">Recomended</p>

            <swiper-container
                        speed="500"
                        loop="true"
                        navigation="false"
                        pagination="true"
                        effect="fade"
                        ref={swiperElRef}
                    >
                        {listings.map(({data, id}) => (
                            <swiper-slide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                                <img src={data.imageUrls[0]} style={{objectFit: "cover", height: "30vw", minHeight: "225px", width: "100%"}} className="cursor-pointer"/>
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}
                                {data.type === "rent" && " / month"}
                                </p>
                            </swiper-slide>
                        ))}

            </swiper-container>
        </>
    );
}
export default Slider;
