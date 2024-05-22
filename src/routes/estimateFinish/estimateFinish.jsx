import React, { Suspense, useState } from "react";
import "./estimateFinish.scss";
import { useLocation } from "react-router-dom";
import numberWithCommas from "../../lib/utils";
import apiRequest from "../../lib/apiRequest";
import LayerMap from "../../components/layerMap/layerMap";
import List from "../../components/list/List";
import DemoPie from "../../components/chart/chart";
import { Layer } from "leaflet";

function EstimateFinish() {
  const location = useLocation();
  const { inputData, result } = location.state;
  const value = result.output[0];
  const arr = inputData[0];

  // State
  const [postPromiseData, setPostPromiseData] = useState(null);
  const [sameLocation, setSameLocation] = useState(false);
  const [sameArea, setSameArea] = useState(false);
  const [sameRooms, setSameRooms] = useState(false);
  const [showMapView, setShowMapView] = useState(true); // New state variable

  // Handle function
  const handleCheckboxChange = (checkbox) => {
    switch (checkbox) {
      case "sameLocation":
        setSameLocation(!sameLocation);
        break;
      case "sameArea":
        setSameArea(!sameArea);
        break;
      case "sameRooms":
        setSameRooms(!sameRooms);
        break;
      default:
        break;
    }
  };

  // API request
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

  const handleAPIRequest = async () => {
    const requestUrl = `posts/rent?currentPage=1&${new URLSearchParams(
      newQuery
    )}`;
    const response = await apiRequest(requestUrl);
    setPostPromiseData(response);
  };
  // console.log("hello", postPromiseData);
  const SuspenseLayerMap = React.lazy(() =>
    import("../../components/layerMap/layerMap")
  );

  return (
    <div className="estimatePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">The home value is:</h1>{" "}
          <h1 style={{ color: "#0061E0" }}>
            ₫ {Number(Math.abs(value).toFixed(2)).toLocaleString()}{" "}
          </h1>
          <p>
            With the information you gave, we have calculated that the home
            value is ₫ {Number(Math.abs(value).toFixed(2)).toLocaleString()}.{" "}
          </p>
          <p>For reference, you can see our statistic below:</p>{" "}
        </div>
      </div>
      <div className="tabContainer">
        <button
          className={`button ${sameLocation ? "active" : ""}`}
          onClick={() => handleCheckboxChange("sameLocation")}
        >
          Same Location
        </button>
        <button
          className={`button ${sameArea ? "active" : ""}`}
          onClick={() => handleCheckboxChange("sameArea")}
        >
          Same Area
        </button>
        <button
          className={`button ${sameRooms ? "active" : ""}`}
          onClick={() => handleCheckboxChange("sameRooms")}
        >
          Same Rooms
        </button>
        <button className="applyButton" onClick={handleAPIRequest}>
          Apply
        </button>
      </div>
      <div className="areaContainer">
        <div className="mapContainer">
          <div className="buttonWrapper">
            <button
              className={showMapView ? "active" : ""}
              onClick={() => setShowMapView(true)}
            >
              Map View
            </button>
            <button
              className={!showMapView ? "active" : ""}
              onClick={() => setShowMapView(false)}
            >
              List View
            </button>
          </div>

          {showMapView ? (
            <div>
              {showMapView && postPromiseData && postPromiseData.data && (
                <LayerMap items={postPromiseData.data} />
              )}
            </div>
          ) : (
            <div>
              {postPromiseData && postPromiseData.data && (
                <List posts={postPromiseData.data} />
              )}
            </div>
          )}
        </div>
        <div className="chartWrapper">
          {/* {postPromiseData && postPromiseData.data && <h1 className="title">Statistic</h1>} */}
          {postPromiseData && postPromiseData.data && (
            <DemoPie someData={postPromiseData?.data} />
          )}
        </div>
      </div>
    </div>
  );
}
export default EstimateFinish;
