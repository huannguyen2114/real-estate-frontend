import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Circle,
  Popup,
} from "react-leaflet";
import "./layerMap.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

const purpleOptions = { color: "purple" };

function LayerMap({ items }) {
  console.log(items);
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [10.8038786, 106.6811704]
      }
      zoom={7}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Circle center={[ 10.8074245 ,106.7329501]} radius={200} />
      </FeatureGroup>
    </MapContainer>
  );
}

export default LayerMap;
