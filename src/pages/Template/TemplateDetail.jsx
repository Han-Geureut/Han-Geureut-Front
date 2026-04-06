import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Profile from '../../assets/images/profilepicture.png';
import Logo from '../../assets/images/memorizelogo.png';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../components/Map/Map';
import Homes from '../../components/Map/Homes';
import Image from '../../assets/images/albumimage.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Backbutton from '../../assets/images/arrow-left2.png';
import FadeInSection from './FadeInSection';
import '../../App.css';

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const popUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: auto; /* Change height to auto */
  background-color: ${({ bgColor }) => bgColor || '#cce6f7'};
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeaderContainer = styled.div`
  width: 97%;
  height: 3vw;
  margin-top: 1.5vw;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  justify-content: space-between;
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
  font-family: 'Poppins', sans-serif;
  font-size: 1.2vw;
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1vw;
  justify-content: center;
  text-align: center;
`;

const Texts = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1.8vw;
  font-weight: 700;
  text-align: left;
  line-height: 2vw;
`;

const Texts2 = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3vw;
  font-weight: 300;
  line-height: 1.8vw;
  white-space: normal;
  word-wrap: break-word;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: 15vw;
  text-align: center;
  justify-content: center;
`;

const BodyContainer = styled.div`
  width: 55%;
  height: auto;
  display: flex;
  margin-left: 15vw;
  flex-direction: column;
  align-items: flex-start;
`;

const LocationName = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3vw;
  font-weight: 400;
  line-height: 1.2vw;
`;

const LocationNames = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3vw;
  font-weight: 300;
  line-height: 2vw;
`;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1vw;
  padding-right: 1vw;
  height: 3vw;
  align-items: center;
  width: 100%;
`;

const TravelContainer = styled.div`
  width: 100%;
  height: 30vw;
  position: relative;
  overflow: hidden;
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
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1vw;
  text-decoration: none;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 1vw;
`;

const ContentContainer = styled.div`
  margin-top: 5vw;
  width: 100%;
`;

const ImageContainer2 = styled.div`
  margin-top: 5vw;
  width: 100%;
  height: auto; /* Change height to auto */
  margin-right: 5vw;
  margin-bottom: 10vw;
`;

const InforContainer = styled.div`
  margin-top: 5vw;
  padding-top: 2vw;
  margin-right: 2vw;
  width: 20%;
`;

const DetailTexts = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1vw;
  font-weight: 300;
  line-height: 1.2vw;
`;

const DetailtextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 3vw;
  gap: 0.5vw;
`;

const ExplainContainer = styled.div`
  margin-bottom: 1vw;
  text-align: left;
`;

const HashTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
`;

const StyledDetailText = styled.p`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1vw;
  font-weight: 300;
  line-height: 1.2vw;
`;

const HashTag = styled.span`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 1vw;
  font-weight: 300;
  background-color: #f0f0f0;
  padding: 0.2vw 0.5vw;
  border-radius: 0.5vw;
`;

function toBrightPastelColor(hexColor) {
  let color = parseInt(hexColor.slice(1), 16);
  let red = (color >> 16) & 0xff;
  let green = (color >> 8) & 0xff;
  let blue = color & 0xff;

  red = Math.floor((red + 4 * 255) / 5);
  green = Math.floor((green + 4 * 255) / 5);
  blue = Math.floor((blue + 4 * 255) / 5);

  let brightPastelColor =
    '#' +
    ((1 << 24) + (red << 16) + (green << 8) + blue)
      .toString(16)
      .slice(1)
      .toUpperCase();

  return brightPastelColor;
}

const TemplateDetail = () => {
  const [album, setAlbum] = useState(null);
  const { photoId } = useParams();
  const [backgroundColor, setBackgroundColor] = useState('RGB(243, 246, 254)');
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();

  const DetailText = ({ dateString }) => {
    const date = new Date(dateString);

    const formattedDate = date
      .toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      .replace('일', '일 ')
      .replace(/시/, '시 ')
      .replace(/분/, '분 ');

    return <StyledDetailText>{formattedDate}</StyledDetailText>;
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `https://api.hangrt.site/api/photo/${photoId}`,
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
        const color = toBrightPastelColor(data.result.photo_color_code);
        setBackgroundColor(color);

        if (data.result.narration_url) {
          const audioObj = new Audio(data.result.narration_url);
          setAudio(audioObj);
          audioObj.play();
        }
      } catch (e) {
        console.error('Failed to fetch album data:', e);
      }
    };

    fetchData();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [photoId]);

  useEffect(() => {
    const handlePopState = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [audio]);

  return (
    <>
      <MainContainer bgColor={backgroundColor}>
        <HeaderContainer>
          <ImageContainer onClick={() => navigate(-1)}>
            <img src={Backbutton} style={{ width: '1.6vw', height: '1.6vw' }} />
          </ImageContainer>
          <img src={Logo} style={{ width: '4vw', height: '4vw' }} />
        </HeaderContainer>

        {album && (
          <>
            <BodyContainer>
              <FadeInSection>
                <TextContainer>
                  <Texts>{album.photo_title || 'No title'}</Texts>
                </TextContainer>

                <ContentContainer>
                  <Texts2>{album.photo_comment}</Texts2>
                </ContentContainer>
              </FadeInSection>
            </BodyContainer>

            <ColumnContainer>
              <ImageContainer2>
                <FadeInSection>
                  <img
                    src={album.photo_url}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '1vw',
                      marginBottom: '5vw',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // box-shadow 속성 추가
                    }}
                  />
                </FadeInSection>
              </ImageContainer2>
              <InforContainer>
                <DetailtextContainer>
                  <FadeInSection>
                    <ExplainContainer>
                      <LocationNames>Location:</LocationNames>
                      <DetailTexts>
                        {album.location.place_name || 'Unknown Location'}
                      </DetailTexts>
                    </ExplainContainer>
                    <ExplainContainer>
                      <LocationNames>Date:</LocationNames>
                      <DetailText dateString={album.location.date} />
                    </ExplainContainer>
                    <ExplainContainer>
                      <LocationNames>Hash Tags:</LocationNames>
                      <HashTagContainer>
                        {album.hashTage_list.map((hashtag, index) => (
                          <HashTag key={index}>{hashtag.tag_name}</HashTag>
                        ))}
                      </HashTagContainer>
                    </ExplainContainer>
                  </FadeInSection>
                </DetailtextContainer>
              </InforContainer>
            </ColumnContainer>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default TemplateDetail;
