import { Suspense, useContext, useEffect, useState } from "react";
import "./estimateFinish.scss";
import { AuthContext } from "../../context/AuthContext";
import { listData } from "../../lib/dummydata";
import Map from "../../components/map/Map";
import DemoPie from "../../components/chart/chart";
import List from "../../components/list/List";
import { Await, useLocation } from "react-router-dom";
import numberWithCommas from "../../lib/utils";
import apiRequest from "../../lib/apiRequest";
import LayerMap from "../../components/layerMap/layerMap";




function EstimateFinish() {
  const location = useLocation();
  const { inputData, result } = location.state;
  const value = result.output[0];
  const arr = inputData[0];
  console.log(location.state);

  const [sameLocation, setSameLocation] = useState(false);
  const [sameArea, setSameArea] = useState(false);
  const [sameRooms, setSameRooms] = useState(false);

  const handleCheckboxChange = (checkbox) => {
    switch (checkbox) {
      case 'sameLocation':
        setSameLocation(!sameLocation);
        break;
      case 'sameArea':
        setSameArea(!sameArea);
        break;
      case 'sameRooms':
        setSameRooms(!sameRooms);
        break;
      default:
        break;
    }
  };

  const newQuery = Object.assign(

    sameLocation && {
      minLatitude: arr[6] - 40,
      maxLatitude: arr[6] + 40,
      minLongitude: arr[7] - 40,
      maxLongitude: arr[7] + 40,
    },
    sameArea && {
      minArea: arr[0] - 5,
      maxArea: arr[0] + 5,
     },
    sameRooms && {
      bedroom: arr[3],
      toilet: arr[4],

    }
  );


  console.log(inputData[0][3]);
  const requestUrl = `posts/rent?${new URLSearchParams(newQuery)}`;
  console.log(requestUrl);
  const postPromise = apiRequest(requestUrl);
  console.log(postPromise);



  const [choice, setChoice] = useState("Map");

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">The home value is:</h1>
          <h1 style={{ color: "#0061E0" }}>
            ₫ {Number(value.toFixed(2)).toLocaleString()}
          </h1>
          <p>
            With the information you gave, we have calculated that the home
            value is ₫ {Number(value.toFixed(2)).toLocaleString()}. In detail:{" "}
          </p>
        </div>
      </div>
      <div className="tabContainer">
      <label>
          <input
            type="checkbox"
            checked={sameLocation}
            onChange={() => handleCheckboxChange("sameLocation")}
          />
          Same Location
        </label>
        <label>
          <input
            type="checkbox"
            checked={sameArea}
            onChange={() => handleCheckboxChange("sameArea")}
          />
          Same Area
        </label>
        <label>
          <input
            type="checkbox"
            checked={sameRooms}
            onChange={() => handleCheckboxChange("sameRooms")}
          />
          Same Rooms
        </label>
      </div>
      <div className="areaContainer">
        <div className="mapContainer">
          {/* <div className="buttonWrapper">
            <button
              className={activeTab === "Same places" ? "active" : ""}
              onClick={() => handleButtonChange("Map")}
            >
              Map View
            </button>
            <button
              className={activeTab === "Same places" ? "active" : ""}
              onClick={() => handleButtonChange("List")}
            >
              List View
            </button>
          </div>

  {postPromise && <LayerMap items={postPromise} /> */}
        </div>
        <div className="chartWrapper">
          <DemoPie />
        </div>
      </div>
    </div>
  );
}

export default EstimateFinish;
