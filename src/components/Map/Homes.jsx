import { useState, useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const Homes = ({ album }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: 37.569227, lng: 126.9777256 },
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

    console.log('구글맵 앨범', album);
    setMap(newMap);
  }, [album]);

  useEffect(() => {
    if (map && album) {
      const bounds = new window.google.maps.LatLngBounds();

      const newMarkers = album.photo_list
        .map((photo) => {
          if (photo.location) {
            // Check if photo.location is not null
            const position = {
              lat: photo.location.latitude || '',
              lng: photo.location.longitude || '',
            };
            bounds.extend(position);

            const marker = new window.google.maps.Marker({
              position,
              map,
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
              <div style="padding: 10px;">
                <img src="${photo.photo_url}" alt="${photo.title}" style="width: 200px; height: auto; border-radius: 10px;" />
                <h3>${photo.location.place_name}</h3>
              </div>`,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            return marker;
          } else {
            console.warn('photo.location is null for photo:', photo);
            return null;
          }
        })
        .filter((marker) => marker !== null); // Filter out any null markers

      setMarkers(newMarkers);
      map.fitBounds(bounds);
      new MarkerClusterer({ markers: newMarkers, map });

      const polylinePath = album.photo_list
        .filter((photo) => photo.location) // Filter out photos with null location
        .map((photo) => ({
          lat: photo.location.latitude,
          lng: photo.location.longitude,
        }));

      const polyline = new window.google.maps.Polyline({
        path: polylinePath,
        geodesic: true,
        strokeColor: '#FF6347',
        strokeOpacity: 0.9,
        strokeWeight: 10,
        icons: [
          {
            icon: {
              path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              strokeColor: '#FF6347',
            },
            offset: '100%',
          },
        ],
      });

      polyline.setMap(map);
    }
  }, [map, album]);

  return (
    <div
      ref={ref}
      id="map"
      style={{ width: '100%', height: '100%', borderRadius: '15px' }}
    ></div>
  );
};

export default Homes;
