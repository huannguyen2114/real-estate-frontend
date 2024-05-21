import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import numberWithCommas from "../../lib/utils";
function Pin({ item }) {
  const substring = item.images.slice(2, -1);
  const array = substring.split("', '");
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={array[0] ? array[0] : "/defaultPic.jpeg"} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>
              {item.ownerEmail ? item.ownerEmail : "Anonymous"}
            </Link>
            {item.bedroom > 0 && <span> {item.bedroom} bedrooms</span>}
            {item.toilet > 0 && <span>{item.toilet} bathrooms</span>}
            <b>
              {item.price !== -1
                ? `₫ ${numberWithCommas(item.price)}`
                : "Price Negotiation"}
            </b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
