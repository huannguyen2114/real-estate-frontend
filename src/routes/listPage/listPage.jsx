import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useState } from "react";

function ListPage() {
  const data = useLoaderData();
  const [showMapView, setShowMapView] = useState(true);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
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
          {!showMapView &&  <Suspense fallback={<p>Loading...</p>}>
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
          </Suspense>}
        </div>
      </div>
      <div className="mapContainer">
        <div>hello</div>
        {showMapView && (
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
