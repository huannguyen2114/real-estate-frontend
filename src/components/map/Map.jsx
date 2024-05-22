import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  console.log(items);
  return (
    <MapContainer
      center={
        items.length > 0
          ? [items[0].latitude, items[0].longitude]
          : [10.8038786, 106.6811704]
      }
      zoom={13}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        if (item.latitude && item.longitude) {
          return <Pin item={item} key={item.id} />;
        }
        return null;
      })}
    </MapContainer>
  );
}

export default Map;
