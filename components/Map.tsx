"use client";

import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Dynamically import MapContainer and TileLayer to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

interface MapProps {
  center?: [number, number];
  zoom?: number;
  style?: React.CSSProperties;
  mapRef: React.MutableRefObject<L.Map | null>;
}

function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;

    return () => {
      // Cleanup handled by parent component
    };
  }, [map, mapRef]);

  return null;
}

const Map = ({ center = [20.5937, 78.9629], zoom = 5, style, mapRef }: MapProps) => {
  return (
    <div style={style}>
      <MapContainer
        key={`map-${center[0]}-${center[1]}-${zoom}`} // Dynamic key
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenReady={() => {
          // Map is ready
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapRefSetter mapRef={mapRef} />
      </MapContainer>
    </div>
  );
};

export default memo(Map);