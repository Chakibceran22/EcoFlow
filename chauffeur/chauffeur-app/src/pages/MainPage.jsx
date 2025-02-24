import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import RouteStats from "../componenets/RouteStats.jsx";
import L from "leaflet";
import { MapPin, Navigation, RotateCcw } from "lucide-react";
import LoadingOverlay from "../componenets/LoadingOverlay.jsx";
import Header from "../componenets/Header.jsx";
import MapContainerCustom from "../componenets/MapContainer.jsx";
import Error from "../componenets/Error.jsx";
import ControlPanel from "../componenets/ControlPanel.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const ORS_API_KEY = import.meta.env.VITE_OPS_API_KEY;

const MapComponent = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingPoint, setSelectingPoint] = useState("start");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeStats, setRouteStats] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const markerRef = React.useRef(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getRoute = async (startPoint, endPoint) => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      };

      const body = {
        coordinates: [
          [startPoint.lng, startPoint.lat],
          [endPoint.lng, endPoint.lat],
        ],
      };

      const response = await fetch("http://localhost:3000/api/directions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to fetch route");
      }

      let data = await response.json();
      data = data.route;

      if (!data.features || !data.features[0]) {
        throw new Error("No route found between these points");
      }

      const coordinates = data.features[0].geometry.coordinates.map((coord) => [
        coord[1],
        coord[0],
      ]);
      const distance = (
        data.features[0].properties.segments[0].distance / 1000
      ).toFixed(1);
      const duration = Math.round(
        data.features[0].properties.segments[0].duration / 60
      );

      setRouteCoordinates(coordinates);
      setRouteStats({ distance, duration });
    } catch (err) {
      console.error("Error fetching route:", err);
      setError(err.message || "Failed to fetch route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (latlng) => {
    const { lat, lng } = latlng;
    const isInAlgeria = lat >= 19 && lat <= 37 && lng >= -9 && lng <= 12;

    if (!isInAlgeria) {
      setError("Selected location is outside Algeria.");
      return;
    }

    if (selectingPoint === "start") {
      setStart(latlng);
      setSelectingPoint("end");
    } else {
      setEnd(latlng);
      setIsSelecting(false);
      await getRoute(start, latlng);
    }
  };

  const startSelecting = (pointType) => {
    setSelectingPoint(pointType);
    setIsSelecting(true);
    if (pointType === "start") {
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
    iconUrl: "./src/assets/gps.svg",
    iconSize: [25, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="relative h-screen w-full bg-[#FAFAFA]">
      <Header currentTime={currentTime} />

      <MapContainerCustom
        handleLocationSelect={handleLocationSelect}
        isSelecting={isSelecting}
        start={start}
        end={end}
        customMarker={customMarker}
        markerRef={markerRef}
        routeCoordinates={routeCoordinates}
      />

      <RouteStats routeStats={routeStats} />
      <Error error={error} />
      <ControlPanel
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        isSelecting={isSelecting}
        selectingPoint={selectingPoint}
        startSelecting={startSelecting}
        resetPoints={resetPoints}
      />
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default MapComponent;
