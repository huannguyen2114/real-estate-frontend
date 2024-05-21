import { Suspense, useContext, useState } from "react";
import "./estimateFinish.scss";
import { AuthContext } from "../../context/AuthContext";
import { listData } from "../../lib/dummydata";
import Map from "../../components/map/Map";
import DemoPie from "../../components/chart/chart";
import List from "../../components/list/List";
import { useLocation } from "react-router-dom";
import numberWithCommas from "../../lib/utils";

function EstimateFinish() {
  const location = useLocation();
  const { inputData, result } = location.state;
  const value = result.output[0];
  console.log(location.state);

  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Overall");
  const [choice, setChoice] = useState("Map");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleButtonChange = (tab) => {
    setChoice(tab);
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">The home value is:</h1>
          <h1 style={{ color: "#0061E0" }}>VND {numberWithCommas(value)}</h1>
          <p>
            With the information you gave, we have calculated that the home
            value is VNĐ {numberWithCommas(value)}. In detail:{" "}
          </p>
        </div>
      </div>
      <div className="tabContainer">
        <button
          className={activeTab === "Overall" ? "active" : ""}
          onClick={() => handleTabChange("Overall")}
        >
          Overall
        </button>
        <button
          className={activeTab === "Same properties" ? "active" : ""}
          onClick={() => handleTabChange("Same properties")}
        >
          Same properties
        </button>
        <button
          className={activeTab === "Same places" ? "active" : ""}
          onClick={() => handleTabChange("Same places")}
        >
          Same places
        </button>
      </div>
      <div className="areaContainer">
        <div className="mapContainer">
          <div className="buttonWrapper">
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

        </div>
        <div className="chartWrapper">
          <DemoPie />
          <DemoPie />
        </div>
      </div>
    </div>
  );
}

export default EstimateFinish;
