import { Link } from "react-router-dom";
import "./card.scss";
import numberWithCommas from "../../lib/utils";

function Card({ item }) {
  const substring = (item.images ?? "").slice(2, -2);
  const array = substring.split("', '");
  if (!array[0]) {
    array[0] = ("/defaultPic.jpeg");
  }
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={array[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>
            {item.ownerEmail ? item.ownerEmail : "Anonymous"}
          </Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">
          {item.price !== -1 ? `₫ ${numberWithCommas(item.price)}` : "Price Negotiation"}
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              {
                <span>
                  {item.bedroom > 0 ? `${item.bedroom} bedrooms` : "Not given"}{" "}
                </span>
              }
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              {
                <span>
                  {item.toilet > 0 ? `${item.toilet} bathrooms` : "Not given"}{" "}
                </span>
              }
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
