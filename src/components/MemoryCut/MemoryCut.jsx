import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../../assets/images/Start.png';
import RightDirection from '../../assets/images/rightdirection.png';
import { useNavigate } from 'react-router-dom';
import EmptyHeart from '../../assets/images/emptywhite.png';
import FilledHeart from '../../assets/images/heart.png';

const BackgroundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: auto;
  position: relative;
  padding-bottom: 5vw; /* 여백을 추가합니다 */
`;

const HalfCircle = styled.div`
  border-radius: 100% 100% 0 0;
  opacity: 0.08;
  background: var(--2, #ff6b00);
  width: 200%;
  height: 87.9vw;
  position: absolute;
  top: 0;
  left: -50%;
  z-index: -1;
`;

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
  margin-top: 10.95vw;
  margin-bottom: 10vw; /* 아래 마진을 추가합니다 */
  height: auto;
  align-items: center;
  position: relative;
  z-index: 1;
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

const MemoryCut = () => {
  const [slideshows, setSlideshows] = useState([]);
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);

  const fetchSlideshow = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/slideshow`, {
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
      console.log(data);
      if (data.isSuccess) {
        setSlideshows(data.result);
        setHearts(new Array(data.result.length).fill(false));
      }
    } catch (e) {
      console.error('Failed to fetch slideshow:', e);
    }
  };

  useEffect(() => {
    fetchSlideshow();
  }, []);

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

  const handlePlaySlideshow = (slideShowUrl) => {
    window.location.href = slideShowUrl; // 슬라이드쇼 URL로 이동
  };

  const handleRightDirectionClick = () => {
    navigate('/WholeMemoryCut');
  };

  return (
    <>
      <BackgroundContainer>
        <HalfCircle />
        <CreatesContainer>
          <TravelContainer>
            <Travelo>Memory Cut</Travelo>
            <img
              src={RightDirection}
              onClick={handleRightDirectionClick}
              style={{ width: '0.6vw', height: '1vw', cursor: 'pointer' }}
            />
          </TravelContainer>
          <AlbumContainer>
            {slideshows.map((slideshow, index) => (
              <Album key={slideshow.albumId}>
                <StyledLink to={`/Template/${slideshow.albumId}`}>
                  <AlbumImage
                    src={slideshow.mainImageUrl}
                    alt="Slideshow Image"
                  />
                </StyledLink>
                <img
                  src={hearts[index] ? FilledHeart : EmptyHeart}
                  style={heartStyle}
                  alt={hearts[index] ? 'Filled Heart' : 'Empty Heart'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(slideshow.albumId, index);
                  }}
                />
                <Detail>
                  <TitleContainer>
                    <Title>{slideshow.albumName}</Title>
                    <IconContainer>
                      <img
                        src={PlayButton}
                        style={{ width: '1.75vw', cursor: 'pointer' }}
                        onClick={() =>
                          handlePlaySlideshow(slideshow.slideShowUrl)
                        }
                      />
                    </IconContainer>
                  </TitleContainer>
                  <Made>{slideshow.userName}</Made>
                </Detail>
              </Album>
            ))}
          </AlbumContainer>
        </CreatesContainer>
      </BackgroundContainer>
    </>
  );
};

export default MemoryCut;
