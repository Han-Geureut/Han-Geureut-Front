import styled from 'styled-components';
import Travel from '../../assets/images/Travelogimage.png';
import Share from '../../assets/images/share.png';
import { Link } from 'react-router-dom';
import EmptyHeart from '../../assets/images/emptywhite.png';
import FilledHeart from '../../assets/images/heart.png';
import EmptyBookmark from '../../assets/images/bookmark_.png';
import FilledBookmark from '../../assets/images/bookmark.png';
import PopularIconImage from '../../assets/images/popular.png';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AlbumProvider, useAlbum } from '../../AlbumContext/AlbumContext';
import RightDirection from '../../assets/images/rightdirection.png';
import { useNavigate } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
`;
const TravelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
  align-items: center;
  gap: 1vw;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 7.65vw;
  margin-bottom: 3.2vw;
  align-items: center;
`;

const Travelo = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const AlbumContainer = styled.div`
  width: 100%;
  margin-top: 2.4vw;
  display: flex;
  flex-direction: row;
  gap: 0.8vw;
  flex-wrap: wrap;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8vw;
  width: calc((100% - 0.8vw * 5) / 6);
`;

const ImageArea = styled.div`
  position: relative;
  border-radius: 0.6vw;
  overflow: hidden;

  .hover-overlay {
    opacity: 0;
  }

  .hover-icon {
    opacity: 0;
    pointer-events: none;
  }

  &:hover .hover-overlay {
    opacity: 1;
  }

  &:hover .hover-icon {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 3.9vw;
  flex-shrink: 0;
  background: #f5f5f5;
  padding: 0.72vw 0.8vw 0.28vw;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AlbumImage = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  height: auto;
  object-fit: cover;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Made = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.62vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 0;
  margin-bottom: 0;
`;

const MetaRow = styled.div`
  margin-top: 0.18vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HashTag = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2vw;
`;

const ViewCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25vw;
`;

const PopularIcon = styled.img`
  width: 0.62vw;
  height: 0.62vw;
  object-fit: contain;
`;

const ViewCountText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 0.58vw;
  font-weight: 500;
  color: #666;
  line-height: 1;
`;

const heartStyle = {
  position: 'absolute',
  right: '1vw',
  top: '1vw',
  width: '1.3vw',
  height: '1.3vw',
  transition: 'opacity 0.2s ease',
  cursor: 'pointer',
};

const bookmarkStyle = {
  position: 'absolute',
  right: '2.7vw',
  top: '0.4vw',
  width: '2.5vw',
  height: '2.5vw',
  objectFit: 'contain',
  transition: 'opacity 0.2s ease',
  cursor: 'pointer',
};

const shuffleAlbums = (list) => {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const AlbumData = [
  { id: 1, title: '앨범제목 1', date: '생성일 1', hashtag: '#해시태그1' },
  { id: 2, title: '앨범제목 2', date: '생성일 2', hashtag: '#해시태그2' },
  { id: 3, title: '앨범제목 3', date: '생성일 3', hashtag: '#해시태그3' },
  { id: 4, title: '앨범제목 4', date: '생성일 4', hashtag: '#해시태그4' },
  { id: 5, title: '앨범제목 5', date: '생성일 5', hashtag: '#해시태그5' },
  { id: 6, title: '앨범제목 6', date: '생성일 6', hashtag: '#해시태그6' },
];

const Travelog = ({ title = 'Travelog' }) => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const BOOKMARK_STORAGE_KEY = 'bookmarkedAlbumIds';

  const handleLike = async (albumId, index) => {
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);
    const isLiked = newHearts[index];

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/album/like/${albumId}`,
        {
          method: isLiked ? 'POST' : 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Like response:', data);

      if (!data.isSuccess) {
        newHearts[index] = !newHearts[index];
        setHearts(newHearts);
      }
    } catch (e) {
      console.error('Failed to like the album:', e);

      newHearts[index] = !newHearts[index];
      setHearts(newHearts);
    }
  };

  const handleRightDirectionClick = () => {
    navigate('/WholeTravelog');
  };

  const { albumId } = useAlbum();
  const [hearts, setHearts] = useState([]);

  const getStoredBookmarkedIds = () => {
    try {
      const raw = localStorage.getItem(BOOKMARK_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse bookmarkedAlbumIds:', e);
      return [];
    }
  };

  const handleBookmark = (targetAlbumId, index) => {
    const nextBookmarks = [...bookmarks];
    nextBookmarks[index] = !nextBookmarks[index];
    setBookmarks(nextBookmarks);

    const storedIds = getStoredBookmarkedIds();
    const updatedIds = nextBookmarks[index]
      ? [...new Set([...storedIds, targetAlbumId])]
      : storedIds.filter((id) => id !== targetAlbumId);

    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updatedIds));
  };

  const toggleHeart = (index) => {
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      const apiBase = `${process.env.REACT_APP_API_URL}/api/album`;

      try {
        const countUrl = new URL(apiBase);
        countUrl.search = new URLSearchParams({
          sortStatus: '_POPULAR',
          page: '1',
          pageCount: '1',
        }).toString();

        const countRes = await fetch(countUrl, { method: 'GET', headers });
        if (!countRes.ok) {
          throw new Error(`HTTP error! status: ${countRes.status}`);
        }
        const countData = await countRes.json();
        const total = Number(countData?.result?.totalElements ?? 0);
        const pageCount = total > 0 ? total : 1;

        const listUrl = new URL(apiBase);
        listUrl.search = new URLSearchParams({
          sortStatus: '_POPULAR',
          page: '1',
          pageCount: String(pageCount),
        }).toString();

        const listRes = await fetch(listUrl, { method: 'GET', headers });
        if (!listRes.ok) {
          throw new Error(`HTTP error! status: ${listRes.status}`);
        }
        const data = await listRes.json();
        if (data?.result?.albums && Array.isArray(data.result.albums)) {
          const list = shuffleAlbums(data.result.albums);
          const bookmarkedIds = getStoredBookmarkedIds();
          setAlbums(list);
          setHearts(list.map((album) => album.likedByUser));
          setBookmarks(list.map((album) => bookmarkedIds.includes(album.albumId)));
        }
        console.log(data);
      } catch (e) {
        console.error('Failed to fetch album data:', e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CreatesContainer>
        <TravelContainer>
          <Travelo>{title}</Travelo>
          <img
            src={RightDirection}
            onClick={handleRightDirectionClick}
            style={{ width: '0.6vw', height: '1vw', cursor: 'pointer' }}
          />
        </TravelContainer>
        <AlbumContainer>
          {albums.map((album, index) => (
            <Album key={album.albumId}>
              <ImageArea>
                <StyledLink to={`/Template/${album.albumId}`}>
                  <AlbumImage src={album.mainImageUrl} alt="Album Image" />
                </StyledLink>
                <HoverOverlay className="hover-overlay" />
                <img
                  className="hover-icon"
                  src={hearts[index] ? FilledHeart : EmptyHeart}
                  style={heartStyle}
                  alt={hearts[index] ? 'Filled Heart' : 'Empty Heart'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(album.albumId, index);
                  }}
                />
                <img
                  className="hover-icon"
                  src={bookmarks[index] ? FilledBookmark : EmptyBookmark}
                  style={bookmarkStyle}
                  alt={bookmarks[index] ? 'Filled Bookmark' : 'Empty Bookmark'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookmark(album.albumId, index);
                  }}
                />
              </ImageArea>
              <Detail>
                <TitleContainer>
                  <Title>{album.albumName}</Title>
                </TitleContainer>
                <MetaRow>
                  <Made>{new Date(album.createdAt).toLocaleDateString()}</Made>
                  <ViewCountContainer>
                    <PopularIcon src={PopularIconImage} alt="Popularity Icon" />
                    <ViewCountText>{album.viewCount ?? 0}</ViewCountText>
                  </ViewCountContainer>
                </MetaRow>
              </Detail>
            </Album>
          ))}
        </AlbumContainer>
      </CreatesContainer>
    </>
  );
};

export default Travelog;
