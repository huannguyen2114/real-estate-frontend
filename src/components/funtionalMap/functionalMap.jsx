import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "./funtionalMap.scss";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css"



const SearchField = ({setLocation}) => {
  const provider = new OpenStreetMapProvider();
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    autocomplete: true,
    showMarker: true,
    searchLabel: "Enter address",
    keepResult: true,
    marker: {
      // optional: L.Marker - default L.Icon.Default
      draggable: true,
    },
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);

    const handleLocation = (result) => {
      console.log(result.location);
      setLocation(result.location);
    };

    map.on("geosearch/showlocation", handleLocation);
    map.on("geosearch/marker/dragend", handleLocation);

    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
};


function FunctionalMap({setLocation}) {

  return (
    <MapContainer
      className="map"
      center={{ lat: 10.8038786, lng: 106.6811704 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SearchField setLocation={setLocation}/>
    </MapContainer>
  );
}

export default FunctionalMap;