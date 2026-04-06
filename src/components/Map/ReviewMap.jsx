import { useState, useEffect, useRef } from 'react';

const ReviewMap = () => {
  const [map, setMap] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: 37.569227, lng: 126.9777256 },
      zoom: 16,
    });

    setMap(newMap);
  }, []);


  return (
    <div
      ref={ref}
      id="map"
      style={{ width: '60vw', height: '23.6vw', borderRadius: '15px' }}
    ></div>
  );
};

export default ReviewMap;
