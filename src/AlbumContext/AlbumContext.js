import React, { createContext, useContext, useState } from 'react';

const AlbumContext = createContext();

export const useAlbum = () => useContext(AlbumContext);

export const AlbumProvider = ({ children }) => {
  const [albumName, setAlbumName] = useState('');
  const [albumInfo, setAlbumInfo] = useState('');
  const [images, setImages] = useState([]);
  const [albumAccess, setAlbumAccess] = useState('PUBLIC');
  const [albumId, setAlbumId] = useState(null);

  const value = {
    albumName,
    setAlbumName,
    albumInfo,
    setAlbumInfo,
    images,
    setImages,
    albumAccess,
    setAlbumAccess,
    albumId,
    setAlbumId,
  };

  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};
