import React, { useEffect, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        window.initMap = undefined;
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '60vw', height: '23.6vw', borderRadius: '15px' }}
    />
  );
}

export default Map;
