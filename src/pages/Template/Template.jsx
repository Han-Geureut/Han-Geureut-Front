import styled from 'styled-components';
import Profile from '../../assets/images/profilepicture.png';
import Logo from '../../assets/images/memorizelogo.png';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../components/Map/Map';
import Homes from '../../components/Map/Homes';
import Image from '../../assets/images/albumimage.png';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import keyframes from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeInSection from './FadeInSection';
import '../../App.css';

const slideUp = keyframes`
  0% {
    transform: translateY(100%); // 아래에서 시작
    opacity: 0;
  }
  100% {
    transform: translateY(0); // 최종 위치로
    opacity: 1;
  }
`;

const popUp = keyframes`
  from {
    transform: translateY(20px); // 아래에서 시작
    opacity: 0; // 투명에서 시작
  }
  to {
    transform: translateY(0); // 원래 위치로 이동
    opacity: 1; // 완전 불투명
  }
`;

const MainConatiner = styled.div`
  width: 100%;
  height: 1000%;
  background-color: RGB(243, 246, 254);
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 97%;
  height: 3vw;
  margin-top: 1.5vw;
  display: flex;
  margin-left: auto; // 왼쪽 마진 자동 조정
  margin-right: auto;
  flex-direction: row;
  justify-content: space-between; /* 양쪽 끝으로 요소를 밀어냄 */
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6vw;
`;

const Profilep = styled.p`
  color: #000;
  font-size: 1.2vw;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  line-height: 1.2vw;
`;

const Infop = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8vw;
  font-weight: 300;
  line-height: 1.2vw;
`;
const MapContainer = styled.div`
  width: 48%;
  margin-top: 4vw;
  height: 70vh;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2vw;
`;

const AlbumContainer = styled.div`
  width: 100%;
  margin-top: 8.4vw;
  height: 35%;
  border-radius: 10px;
  display: flex;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AlbumText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: italic;
  font-weight: 300;
  margin-left: 3vw;
  line-height: 1vw;
  text-align: left; // 텍스트를 왼쪽으로 정렬
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  width: 15%;
  /* background-color: red; */
  align-items: center; // 내부 텍스트 중앙 정렬
  justify-content: flex-start;
  text-align: left;
  padding: 0 20px; // 텍스트 주변 여백
`;

const WholeAlbumContainer = styled.div`
  width: 100%;
  height: 35vw;
  justify-content: flex-end;
  /* background-color: green; */
  margin-top: 5vw;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ImagesContainer = styled.div`
  width: 80%;
  height: 100%;
  /* background-color: yellow; */
`;

const TextsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4.5vw;
  width: 10vw;
  /* background-color: yellow; */
  gap: 1vw;
  flex-direction: column;
`;
const Texts = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: italic;
  font-weight: 300;
  line-height: 1vw; /* 124.878% */
  margin-right: 1vw;
  /* background-color: red; */
`;

const Texts2 = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 13.453px;
  font-style: italic;
  font-weight: 200;
  line-height: 16.8px; /* 124.878% */
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2vw;
`;

const BodyContainer = styled.div`
  width: min(94vw, 1500px);
  height: 1000%;
  margin-bottom: 10vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1.2vw;
`;

const PhotoColumn = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 2.2vw;
  margin-top: 4vw;
`;

const TripImageContainer = styled.div`
  width: 100%;
`;
//albumId = 13

const LocationName = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3vw;
  font-weight: 300;
  line-height: 1.2vw;
`;

const LocationNames = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: italic;
  font-weight: 300;
  line-height: 1.2vw;
`;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1vw;
  padding-right: 1vw;

  height: 3vw;
  text-align: center;
  align-items: center;
  width: 100%;
`;

const TravelContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f6fe;
  position: relative;
  border-radius: 1vw;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6); // 그림자 설정
  overflow: hidden; // 컨테이너를 넘어가는 부분을 숨김
`;

const OverlayButton = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  width: 6vw;
  height: 2.5vw;
  text-align: center;

  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.7); // 반투명 흰색 배경
  border-radius: 1vw;
  text-decoration: none;
  color: black;
  font-weight: 300;
  font-size: 1vw;
`;

const ReviewWriteButton = styled(Link)`
  padding: 0.55vw 1.1vw;
  border-radius: 0.35vw;
  background: #5e81ff;
  color: #fff;
  font-family: Pretendard, sans-serif;
  font-size: 0.95vw;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    opacity: 0.92;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2vw;
`;


const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Template = () => {
  const [album, setAlbum] = useState(null);
  const { albumId } = useParams();
  const [photoId, setPhotoId] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = (photoId) => {
    navigate(`/template-detail/${photoId}`);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const authToken = localStorage.getItem('authToken');
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_API_URL}/api/album/GoogleMapsPlatform/${albumId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log('구글맵', data);
  //     } catch (e) {
  //       console.error('Failed to fetch album data:', e);
  //     }
  //   };

  //   fetchData();
  // }, [albumId]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/album/${albumId}`,
          {
            method: 'GET',
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
        setAlbum(data.result);
        console.log(data);
      } catch (e) {
        console.error('Failed to fetch album data:', e);
      }
    };

    fetchData();
  }, [albumId]);
  return (
    <>
      <MainConatiner>
        <HeaderContainer>
          <ImageContainer>
            <img src={Profile} style={{ width: '3vw', height: '3vw' }} />
            <ColumnContainer>
              {album && <Profilep>{album.album_title}</Profilep>}
              {album && <Infop>{album.album_info}</Infop>}
            </ColumnContainer>
          </ImageContainer>
          <HeaderRight>
            <ReviewWriteButton to={`/Writereview/${albumId}`}>
              리뷰쓰기
            </ReviewWriteButton>
            <img src={Logo} style={{ width: '4vw', height: '4vw' }} />
          </HeaderRight>
        </HeaderContainer>

        <BodyContainer>
          <MapContainer>
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <Homes album={album} />
            </Wrapper>
          </MapContainer>
          <PhotoColumn>
            {album?.photo_list?.map((photo, index) => (
              <TripImageContainer key={index}>
                <FadeInSection>
                <InfoTextContainer>
                  <LocationName>{photo.location?.place_name}</LocationName>
                  <LocationNames>
                    {photo.location?.date?.split('T')[0]}
                    <br />
                  </LocationNames>
                </InfoTextContainer>
                <TravelContainer>
                  <img
                    src={photo.photo_url}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                  <OverlayButton
                    onClick={(e) => {
                      e.preventDefault(); // 기본 이벤트 방지
                      handleNavigation(photo.photo_id); // 현재 사진의 photo_id를 넘김
                    }}
                  >
                    더보기
                  </OverlayButton>
                </TravelContainer>
                </FadeInSection>
              </TripImageContainer>
            ))}
          </PhotoColumn>
        </BodyContainer>
      </MainConatiner>
    </>
  );
};

export default Template;
