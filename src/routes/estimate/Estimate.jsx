import { useState } from "react";
import "./estimate.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FunctionalMap from "../../components/funtionalMap/functionalMap";
function Estimate() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const request = axios.create({
      baseURL: "http://127.0.0.1:5000/api/estate/estimate-price",
      withCredentials: true,
    });
    console.log(location);
    const inputs = Object.fromEntries(formData);
    const data = [
      [
        parseFloat(inputs.size),
        parseFloat(inputs.frontageArea),
        parseFloat(inputs.entranceArea),
        parseInt(inputs.floor),
        parseInt(inputs.bedroom),
        parseInt(inputs.bathroom),
        parseInt(inputs.legalStatus),
        parseInt(inputs.furniture),
        location.x,
        location.y,
        parseInt(inputs.type),
      ],
    ]
    try {
      const res = await request.post("", {
        "inputData": data,
      });
      console.log(res);
      navigate("/estimateFinish", { state: { result: res.data, inputData: data } });
    } catch (e) {
      console.log(e);
      setError(e);
    }

  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Estimate Your Home</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="size">Total Size (m²)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="frontageArea">Frontage Area (m)</label>
              <input
                min={0}
                id="frontageArea"
                name="frontageArea"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="entranceArea">Entrance Area (m)</label>
              <input
                min={0}
                id="entranceArea"
                name="entranceArea"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="floor">Floor</label>
              <input min={0} id="floor" name="floor" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={0} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={0} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="legalStatus">Legal Status</label>
              <select name="legalStatus">
                <option value="1">Có sổ hồng</option>
                <option value="0">Không sổ hồng</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="furniture">Furniture</label>
              <select name="furniture">
                <option value="1">Cơ bản</option>
                <option value="2">Cao cấp</option>
                <option value="0">Không nội thất</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="0" defaultChecked>
                  Rent
                </option>
                <option value="1">Buy</option>
              </select>
            </div>
            <button className="sendButton" style={{ height: "50px" }}>
              Estimate Now
            </button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <FunctionalMap setLocation={setLocation} />
      </div>
    </div>
  );
}

export default Estimate;
