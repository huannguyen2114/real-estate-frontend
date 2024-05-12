import { Suspense, useContext, useState } from "react";
import "./estimateFinish.scss";
import { AuthContext } from "../../context/AuthContext";
import { listData } from "../../lib/dummydata";
import Map from "../../components/map/Map";

function EstimateFinish() {
  const { currentUser } = useContext(AuthContext);
  const data = listData;
  const [activeTab, setActiveTab] = useState("Overall");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">The home value is:</h1>
          <h1 style={{ color: "#0061E0" }}>VND 2.000.000.000</h1>
          <p>
            With the information you gave, we have calculated that the home
            value is VNĐ 2.000.000.000. In detail:{" "}
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
      <div className="mapContainer">
        {activeTab === "Overall" && <Map items={data} />}
        {activeTab === "Same properties" && <Map items={data} />}
        {activeTab === "Same places" && <Map items={data} />}
      </div>
    </div>
  );
}

export default EstimateFinish;
