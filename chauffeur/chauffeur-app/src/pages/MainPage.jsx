import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RouteStats from '../componenets/RouteStats.jsx';
import L from "leaflet";
import { MapPin, Navigation, RotateCcw } from 'lucide-react';
import MapClickHandler from '../componenets/MapClickerHandler.jsx';
import LoadingOverlay from '../componenets/LoadingOverlay.jsx'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const ORS_API_KEY = import.meta.env.VITE_OPS_API_KEY;

const MapComponent = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingPoint, setSelectingPoint] = useState('start');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeStats, setRouteStats] = useState(null);
  const markerRef = React.useRef(null);
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.on("mouseover", () => marker.openPopup()); // Open popup on hover
      marker.on("mouseout", () => marker.closePopup()); // Close popup when mouse leaves
    }
  }, []);

  const getRoute = async (startPoint, endPoint) => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json'
      };

      const body = {
        coordinates: [
          [startPoint.lng, startPoint.lat],
          [endPoint.lng, endPoint.lat]
        ]
      };

      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to fetch route');
      }

      const data = await response.json();
      
      if (!data.features || !data.features[0]) {
        throw new Error('No route found between these points');
      }

      const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
      const distance = (data.features[0].properties.segments[0].distance / 1000).toFixed(1);
      const duration = Math.round(data.features[0].properties.segments[0].duration / 60);
      
      setRouteCoordinates(coordinates);
      setRouteStats({ distance, duration });
    } catch (err) {
      console.error('Error fetching route:', err);
      setError(err.message || 'Failed to fetch route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (latlng) => {
    if (selectingPoint === 'start') {
      setStart(latlng);
      setSelectingPoint('end');
    } else {
      setEnd(latlng);
      setIsSelecting(false);
      await getRoute(start, latlng);
    }
  };

  const startSelecting = (pointType) => {
    setSelectingPoint(pointType);
    setIsSelecting(true);
    if (pointType === 'start') {
      setStart(null);
      setEnd(null);
      setRouteCoordinates([]);
      setRouteStats(null);
    }
  };

  const resetPoints = () => {
    setStart(null);
    setEnd(null);
    setRouteCoordinates([]);
    setIsSelecting(false);
    setError(null);
    setRouteStats(null);
  };
  const customMarker = new L.Icon({
    iconUrl: './src/assets/gps.svg', 
    iconSize: [25, 30], // Default Leaflet size
    iconAnchor: [12, 41], // Positioning anchor
    popupAnchor: [1, -34]
  });
  return (
    <div className="relative h-screen w-full">
      {/* Map Container */}
      <div className="absolute inset-0">
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
          {start && <Marker position={start} icon={customMarker} ref={markerRef} ><Popup>Start</Popup></Marker>}
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
      {/* Route Stats */}
      {routeStats && <RouteStats {...routeStats} />}

      {/* Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4" style={{ zIndex: 1000 }}>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => startSelecting('start')}
            disabled={isSelecting}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
              isSelecting && selectingPoint === 'start'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <MapPin size={20} />
            {start ? 'Change Start Point' : 'Select Start Point'}
          </button>
          
          <button 
            onClick={() => startSelecting('end')}
            disabled={isSelecting || !start}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
              isSelecting && selectingPoint === 'end'
                ? 'bg-blue-100 text-blue-600'
                : start
                ? 'bg-white border border-gray-200 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Navigation size={20} />
            {end ? 'Change End Point' : 'Select End Point'}
          </button>

          <button 
            onClick={resetPoints}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isSelecting && (
          <div className="mt-3 p-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            Tap the map to select a {selectingPoint} point
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      
    </div>
  );
};

export default MapComponent;