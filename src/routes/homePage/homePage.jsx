import { useContext, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss"
import { AuthContext } from "../../context/AuthContext";
import FunctionalMap from "../../components/funtionalMap/functionalMap";

function HomePage() {

  const {currentUser} = useContext(AuthContext);
  const [location, setLocation] = useState(null);


  return (
    <div className="home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover A Place you love to live</h1>
          <p>

              Discover Your Perfect Home with Data-Driven Insights! Navigate the
              Real Estate Market Confidently with EstateTopia.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <FunctionalMap setLocation={setLocation} />
      </div>
    </div>
  );
}

export default HomePage;