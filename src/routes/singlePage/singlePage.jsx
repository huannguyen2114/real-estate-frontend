import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import numberWithCommas from "../../lib/utils";
function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      console.log(post.id);
      await apiRequest.post("/users/save", { "postId": post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const substring = post.images.slice(2, -1);
  const array = substring.split("', '");

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={array ? array : "/defaultPic.jpeg"} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.ownerEmail}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">{post.price > 0 ? `₫ ${numberWithCommas(post.price)}` : "Price Negotiation"}</div>
              </div>
              <div className="user">
                <img src="/noavatar.jpg" alt="" />
                <span>{post.ownerPhone}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Legal</span>
                {post.legal  ? (
                  <p>{post.legal}</p>
                ) : (
                  <p>Legal Not Available</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Floor</span>
                {post.floor !== -1 ? (
                  <p>{post.floor} floors</p>
                ) : (
                  <p>Not Available</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Furniture</span>
                <p>{post.furniture !== null ? post.furniture : "Not Available"}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.area} m²</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.toilet} bathroom</span>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#0061E0" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
