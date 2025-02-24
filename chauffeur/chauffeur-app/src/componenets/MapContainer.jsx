import { MapContainer, TileLayer, Popup, Marker, Polyline } from "react-leaflet"
import MapClickHandler from "./MapClickerHandler"

const MapContainerCustom = ({handleLocationSelect, isSelecting, start, end, customMarker, markerRef, routeCoordinates}) => {
    return(
        <div className="absolute inset-0 top-16">
        <MapContainer 
          center={[40, -3]} 
          zoom={5} 
          className="h-full w-full"
          style={{ zIndex: 1 }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapClickHandler 
            onLocationSelect={handleLocationSelect}
            isSelecting={isSelecting}
          />
          {start && <Marker position={start} icon={customMarker} ref={markerRef}><Popup>Start</Popup></Marker>}
          {end && <Marker position={end} icon={customMarker} ref={markerRef}><Popup>Destination</Popup></Marker>}
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
    )
}
export default MapContainerCustom;