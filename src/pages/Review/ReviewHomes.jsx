import { useState, useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const ReviewHomes = ({ lat, lng, address, placeName }) => {
  const [map, setMap] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat, lng },
      zoom: 16,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    setMap(newMap);
  }, [lat, lng]);

  useEffect(() => {
    if (map) {
      const position = { lat, lng };
      map.setCenter(position);
      const marker = new window.google.maps.Marker({
        position,
        map,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 10px;">
                    <h3>${placeName}</h3>
                    <p>주소: ${address}</p>
                  </div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  }, [map, lat, lng]);

  return (
    <div
      ref={ref}
      id="map"
      style={{ width: '100%', height: '100%', borderRadius: '15px' }}
    ></div>
  );
};

export default ReviewHomes;
