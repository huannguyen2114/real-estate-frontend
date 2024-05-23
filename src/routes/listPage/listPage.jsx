import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

function ListPage() {
  const data = useLoaderData();
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1024);
  const [showMapView, setShowMapView] = useState(true);

  const windowWidth = window.innerWidth;
  const isBig = windowWidth > 1024 && windowWidth < 1366;

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(showMapView);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {!isBigScreen && (
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
          )}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        {(showMapView || isBigScreen) && (
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default ListPage;
