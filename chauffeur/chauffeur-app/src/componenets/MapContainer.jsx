import { MapContainer, TileLayer, Popup, Marker, Polyline } from "react-leaflet";
import MapClickHandler from "./MapClickerHandler";
import L from 'leaflet';

// First, make sure marker icon images are available
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarker = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapContainerCustom = ({handleLocationSelect, isSelecting, start, end, markerRef, routeCoordinates}) => {
  // Center coordinates for Algiers
  const algiers = [36.7538, 3.0588];
  
  return (
    <div className="absolute inset-0 top-16">
      <MapContainer 
        center={algiers}
        zoom={12} 
        className="h-full w-full"
        style={{ zIndex: 1 }}
        maxBounds={[
          [35.7538, 2.0588], // Southwest bounds
          [37.7538, 4.0588]  // Northeast bounds
        ]}
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          bounds={[
            [35.7538, 2.0588],
            [37.7538, 4.0588]
          ]}
        />
        <MapClickHandler 
          onLocationSelect={handleLocationSelect}
          isSelecting={isSelecting}
        />
        {/* {start && (
          // <Marker 
          //   position={[3.0591, 36.7764]}
          //   icon={customMarker}
          // >
          //   <Popup>Tafourah - Grande Poste</Popup>
          // </Marker>
        )}
        {end && (
          // <Marker 
          //   position={[3.0591, 36.7764]}
          //   icon={customMarker}
          // >
          //   <Popup>El Harrach Bus Station</Popup>
          // </Marker>
        )} */}
        {routeCoordinates.length > 0 && (
          <Polyline 
            positions={routeCoordinates}
            className="route-line"
            color="#4CAF50"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapContainerCustom;