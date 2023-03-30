import { Link } from "react-router-dom"

import DeleteIcon from "./Interface/DeleteIcon"
import BedIcon from "./Interface/Bedicon"
import BathIcon from "./Interface/BathIcon"


function ListingItems({listing, id, onDelete}) {

    console.log
  return (
    <li className="categoryListing">
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg"/>

            <div className="categoryListingDetails">
              <p className="categoryListingLocation">{listing.location}</p>
              <p className="categoryListingName">{listing.name}</p>
              <p className="categoryListingPrice">
              ${listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {listing.type === "rent" && " / Month"}
              </p>

                <div className="categoryListingInfoDiv">
                  <BedIcon />
                  <p className="categoryListingInfoText">
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
                  </p>

                  <BathIcon />
                  <p className="categoryListingInfoText">
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
                  </p>
                </div>
            </div>
        </Link>

        {onDelete && (
          <DeleteIcon className="removeIcon" color="rgb(231,76,60)" onclick={() => onDelete} />
        )}

    </li>

    
  )
}
export default ListingItems