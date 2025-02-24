import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import RouteStats from "../componenets/RouteStats.jsx";
import L from "leaflet";
import LoadingOverlay from "../componenets/LoadingOverlay.jsx";
import Header from "../componenets/Header.jsx";
import MapContainerCustom from "../componenets/MapContainer.jsx";
import Error from "../componenets/Error.jsx";
import ControlPanel from "../componenets/ControlPanel.jsx";

// Fix Leaflet marker icon paths
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

// Create custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ORS_API_KEY = import.meta.env.VITE_OPS_API_KEY;

const MapComponent = () => {
  const dataTest = {
    "coordinates": [
      {lat:3.0618, lng:36.7821},  // Place des Martyrs
      {lat:3.0591, lng:36.7764},  // Tafourah - Grande Poste
      {lat:3.0544, lng:36.7648},  // Khelifa Boukhalfa
      {lat:3.0652, lng:36.7324},  // Bir Mourad Raïs
      {lat:3.0025, lng:36.7437},  // Ben Aknoun
      {lat:3.0870, lng:36.7326},  // Kouba - Palais des Expositions
      {lat:3.1806, lng:36.7130},  // Bab Ezzouar
      {lat:2.8402, lng:36.7113},  // Zeralda
      {lat:3.0423, lng:36.7978},  // Bab El Oued
      {lat:3.2804, lng:36.7451}   // Reghaïa
    ]
  }
  const fromTafourahHarrach = {
    "coordinates": [
      {lat:3.0591, lng:36.7764},  // Tafourah - Grande Poste
      {lat:3.1136, lng:36.7132}  // El Harrach Bus Station
    ],
    "demand": 50
  }
  const fromTafourahBabEzzouar = {
    "coordinates": [
      {lat:3.0591, lng:36.7764},  // Tafourah - Grande Poste
      {lat:3.1806, lng:36.7130},  // Bab Ezzouar
    ],
    "demand": 40
  }

  const [start, setStart] = useState(fromTafourahHarrach.coordinates[0]);
  const [end, setEnd] = useState(fromTafourahHarrach.coordinates[1]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingPoint, setSelectingPoint] = useState("start");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeStats, setRouteStats] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [demand, setDemand] = useState(fromTafourahHarrach.demand); // Initialize with a default value
  const markerRef = React.useRef(null);

  // Initial route loading
  useEffect(() => {
    const initializeRoute = async () => {
      if (start && end) {
        if(fromTafourahHarrach.demand > fromTafourahBabEzzouar.demand)
        {
          await getRoute(fromTafourahHarrach.coordinates[0], fromTafourahHarrach.coordinates[1])
        }
        else
        {
          await getRoute(fromTafourahBabEzzouar.coordinates[0], fromTafourahBabEzzouar.coordinates[1])

        }
      }
    };
    initializeRoute();
  }, []); // Only run once on component mount

  // Handle demand changes separately
  useEffect(() => {
    const updateDemand = () => {
      const newDemand = fromTafourahBabEzzouar.demand > fromTafourahHarrach.demand
        ? fromTafourahBabEzzouar.demand
        : fromTafourahHarrach.demand;
      setDemand(newDemand);
    };
    updateDemand();
  }, []);

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => marker.closePopup());
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getRoute = async (startPoint, endPoint) => {
    if (!startPoint || !endPoint) return;
    
    try {
      setLoading(true);
      setError(null);

      const headers = {
        Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      };

      const body = {
        coordinates: [
          [startPoint.lat, startPoint.lng],
          [endPoint.lat, endPoint.lng],
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

  return (
    <div className="relative h-screen w-full bg-[#FAFAFA]">
      <Header currentTime={currentTime} />
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
      {loading ? <LoadingOverlay /> : (
        <MapContainerCustom
          handleLocationSelect={handleLocationSelect}
          isSelecting={isSelecting}
          start={start}
          end={end}
          markerRef={markerRef}
          routeCoordinates={routeCoordinates}
          customIcon={customIcon}
        />
      )}
    </div>
  );
};

export default MapComponent;