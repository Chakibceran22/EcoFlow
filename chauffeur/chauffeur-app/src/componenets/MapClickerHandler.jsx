import React from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
const MapClickHandler = ({ onLocationSelect, isSelecting }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      if (isSelecting) {
        onLocationSelect(e.latlng);
      }
    },
  });

  useEffect(() => {
    if (isSelecting) {
      map.dragging.disable();
      map.getContainer().style.cursor = 'crosshair';
    } else {
      map.dragging.enable();
      map.getContainer().style.cursor = 'grab';
    }
  }, [isSelecting, map]);

  return null;
};

export default MapClickHandler;