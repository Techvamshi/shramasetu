"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Click the button to get location");
  const [coords, setCoords] = useState(null);

  const sendLocationToAPI = async (latitude, longitude) => {
    try {
      await fetch(
        `/api/save-location?lat=${latitude}&lon=${longitude}`
      );
      setStatus("Location sent to server ✅");
    } catch (err) {
      setStatus("Failed to send location");
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        sendLocationToAPI(latitude, longitude);
      },
      () => setStatus("Permission denied or error getting location")
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Get Precise Location</h1>
      <button
        onClick={getLocation}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Location
      </button>
      <p>{status}</p>
      {coords && (
        <p>
          Latitude: {coords.latitude} <br />
          Longitude: {coords.longitude}
        </p>
      )}
    </div>
  );
}
