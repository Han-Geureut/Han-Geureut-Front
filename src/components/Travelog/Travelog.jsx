import styled from 'styled-components';
import Travel from '../../assets/images/Travelogimage.png';
import Share from '../../assets/images/share.png';
import { Link } from 'react-router-dom';
import EmptyHeart from '../../assets/images/emptywhite.png';
import FilledHeart from '../../assets/images/heart.png';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AlbumProvider, useAlbum } from '../../AlbumContext/AlbumContext';
import RightDirection from '../../assets/images/rightdirection.png';
import { useNavigate } from 'react-router-dom';
import Trash from '../../assets/images/trash-2.png';
import PlayButton from '../../assets/images/Start.png';

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
  width: 60%;
  margin-top: 7.65vw;
  margin-bottom: 7.5vw;
  height: 72vw;
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
  margin-top: 2.4vw;
  display: flex;
  flex-direction: row;
  gap: 1.9vw;
  flex-wrap: wrap;
`;

const Album = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 2vw;
  width: calc((100% - 2.2vw * 2) / 3);
  min-width: 18.5vw;
`;

const Detail = styled.div`
  width: 100%;
  height: 7.4vw;
  flex-shrink: 0;
  background: #f5f5f5;
  padding: 1.6vw 1.4vw 0.85vw 1.3vw;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 21vw;
`;

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Made = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 0.3vw;
  margin-bottom: 1.3vw;
`;

const HashTag = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2vw;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const heartStyle = {
  position: 'absolute',
  right: '1vw',
  top: '1vw',
  width: '1.3vw',
  height: '1.3vw',
  cursor: 'pointer',
};

export const AlbumData = [
  { id: 1, title: '앨범제목 1', date: '생성일 1', hashtag: '#해시태그1' },
  { id: 2, title: '앨범제목 2', date: '생성일 2', hashtag: '#해시태그2' },
  { id: 3, title: '앨범제목 3', date: '생성일 3', hashtag: '#해시태그3' },
  { id: 4, title: '앨범제목 4', date: '생성일 4', hashtag: '#해시태그4' },
  { id: 5, title: '앨범제목 5', date: '생성일 5', hashtag: '#해시태그5' },
  { id: 6, title: '앨범제목 6', date: '생성일 6', hashtag: '#해시태그6' },
];

const deleteAlbum = async (albumId) => {
  const authToken = localStorage.getItem('authToken');

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/album/${albumId}`,
      {
        method: 'DELETE',
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
    console.log(data);
    if (response.ok && data.isSuccess) {
      console.log('Album deleted successfully');
      alert('앨범이 삭제되었습니다!');
      window.location.reload();
    } else if (!response.ok && response.status === 403) {
      console.error('Failed to delete the album');
      alert('작성자만 앨범 삭제가 가능합니다!');
    } else {
      console.error('Failed to delete the album');
      alert('앨범 삭제에 실패했습니다!');
    }
  } catch (e) {
    console.error('Failed to delete the album:', e);
    alert('작성자만 앨범 삭제가 가능합니다!');
  }
};

const Travelog = ({ title = 'Travelog' }) => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [slideshowUrl, setSlideshowUrl] = useState(''); // Add state for slideshow URL

  const handleLike = async (albumId, index) => {
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/album/like/${albumId}`,
        {
          method: 'POST',
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
  const [hearts, setHearts] = useState(new Array(AlbumData.length).fill(false));

  const toggleHeart = (index) => {
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);
  };

  const handlePlaySlideshow = async (albumId) => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/slideshow/${albumId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.isSuccess) {
          setSlideshowUrl(data.result); // Store the slideshow URL in state
          window.location.reload();
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      console.error('Failed to fetch slideshow:', e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const url = new URL('${process.env.REACT_APP_API_URL}/api/album');
      const params = {
        sortStatus: '_POPULAR',
        page: 1,
        pageCount: 6,
      };
      url.search = new URLSearchParams(params).toString();

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.result && Array.isArray(data.result.albums)) {
          setAlbums(data.result.albums);
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
              <StyledLink to={`/Template/${album.albumId}`}>
                <AlbumImage src={album.mainImageUrl} alt="Album Image" />
              </StyledLink>
              <img
                src={hearts[index] ? FilledHeart : EmptyHeart}
                style={heartStyle}
                alt={hearts[index] ? 'Filled Heart' : 'Empty Heart'}
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(album.albumId, index);
                }}
              />
              <Detail>
                <TitleContainer>
                  <Title>{album.albumName}</Title>
                  <IconContainer>
                    <img
                      src={Trash}
                      alt="Delete Icon"
                      style={{
                        width: '1.1vw',
                        height: '1.1vw',
                        cursor: 'pointer',
                      }}
                      onClick={() => deleteAlbum(album.albumId)}
                    />
                    <img
                      src={PlayButton}
                      style={{ width: '1.75vw', cursor: 'pointer' }}
                      onClick={() => handlePlaySlideshow(album.albumId)}
                    />
                  </IconContainer>
                </TitleContainer>
                <Made>{new Date(album.createdAt).toLocaleDateString()}</Made>
              </Detail>
            </Album>
          ))}
        </AlbumContainer>
        {/* {slideshowUrl && (
          <div>
            <a href={slideshowUrl} target="_blank" rel="noopener noreferrer">
              View Slideshow
            </a>
          </div>
        )} */}
      </CreatesContainer>
    </>
  );
};

export default Travelog;
