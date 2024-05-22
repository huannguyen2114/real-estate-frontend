import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Circle, Popup } from 'react-leaflet';
import './layerMap.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

const purpleOptions = { color: 'purple' };

function LayerMap({ items }) {
  // items = items.data;
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && items.length === 1) {
      const { latitude, longitude } = items[0];
      mapRef.current.leafletElement.flyTo([latitude, longitude], 13);
    }
  }, [items]);


  return (
    <MapContainer
      key={JSON.stringify(items)}
      center={[10.8038786, 106.6811704]}
      zoom={13}
      scrollWheelZoom={true}
      className="layerMap"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        if (item.latitude && item.longitude && item.price !== -1) {
          return <Pin item={item} key={item.id} />;
        }
        return null;
      })}
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Circle center={[10.8074245, 106.7329501]} radius={200} />
      </FeatureGroup>
    </MapContainer>
  );
}

export default LayerMap;