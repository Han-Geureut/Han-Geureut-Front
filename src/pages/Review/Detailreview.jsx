import Header from '../../components/Header/Header';
import styled from 'styled-components';
import RevieweBanners from '../../assets/images/Writereviewbanner.png';
import Review from '../../components/Review/Review';
import Reviewrec from '../../assets/images/reviewrec.png';
import Location from '../../assets/images/Location on.png';
import Time from '../../assets/images/Access time.png';
import Call from '../../assets/images/Call.png';
import ETC from '../../assets/images/More horiz.png';
import { Wrapper } from '@googlemaps/react-wrapper';
import Homes from '../../components/Map/Homes';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewHomes from './ReviewHomes';
import LeftButtonImage from '../../assets/images/leftbutton.png';
import RightButtonImage from '../../assets/images/rightbutton.png';
import RevieweBanner from '../../assets/images/globe.png';

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 27vw;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const BannerText = styled.div`
  position: absolute;
  color: white;
  font-family: Pretendard;
  font-size: 3vw; // Adjust the font size as needed
  font-weight: bold;
  text-align: center;
`;

const LeftButton = styled.img`
  flex-shrink: 0;
  width: 3.9vw;
  height: 3.9vw;
  position: absolute;
  left: -2.7%;
  top: 50%;
  transform: translateY(-50%);
`;

const RightButton = styled.img`
  position: absolute;
  right: -2.7%;
  top: 50%;
  transform: translateY(-50%);
  width: 3.9vw;
  height: 3.9vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 7.65vw;
  margin-bottom: 7.5vw;
  height: 120vw;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 7.6vw;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6vw;
  padding-top: 1.2vw;
  padding-left: 2.35vw;
`;

const PlacePicture = styled.img`
  width: 20vw;
  height: 20vw;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const InfoText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5vw;
  white-space: pre-line; /* Preserve newlines */
  max-width: 20vw;
`;

const InfoIcon = styled.img`
  width: 1.6vw;
  height: 1.6vw;
`;

const InfoItemComponent = ({ icon, text }) => (
  <InfoItem>
    <InfoIcon src={icon} />
    <InfoText>{text}</InfoText>
  </InfoItem>
);

const TravelContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const Travelo = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 23vw;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FollowButton = styled.button`
  display: inline-flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--2, #5e81ff);
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw; /* 150% */
`;

const Detailreview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const Handlereview = () => {
    navigate(`/Writereview/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `https://api.hangrt.site/search/placeDetail/${id}`,
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
        setData(data.result);
        console.log(data);
      } catch (e) {
        console.error('상세 리뷰:', e);
      }
    };

    const fetchReviews = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `https://api.hangrt.site/api/reviews/places/${id}?page=1&pageCount=10`,
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
        const reviewData = await response.json();
        console.log(reviewData);
        setReviews(reviewData.result.reviewList);
      } catch (e) {
        console.error('리뷰 데이터:', e);
      }
    };

    fetchData();
    fetchReviews();
  }, [id]);

  const formatBusinessHours = (businessStatus) => {
    if (Array.isArray(businessStatus) && businessStatus.length > 0) {
      return businessStatus.join('\n'); // Join array elements with newlines
    }
    return '24시간 영업';
  };

  return (
    <>
      <Header />
      <BannerContainer>
        <ImgContainer>
          <img
            src={data?.placeDetail?.placePhotoUrl || RevieweBanner}
            style={{ width: '100%', height: '27vw' }}
          />
          <BannerText>{data?.placeDetail?.placeName}</BannerText>
        </ImgContainer>
      </BannerContainer>

      <Container>
        <CreatesContainer>
          <RowContainer>
            <ColumnContainer>
              <PlacePicture
                src={data?.placeDetail?.placePhotoUrl || Reviewrec}
              />
              <FollowButton onClick={Handlereview}>리뷰쓰기</FollowButton>
            </ColumnContainer>
            <RowsContainer>
              <ColumnContainer>
                <InfoItemComponent
                  icon={Location}
                  text={data?.placeDetail?.placeName || 'Loading...'}
                />
                <InfoItemComponent
                  icon={Time}
                  text={formatBusinessHours(data?.placeDetail?.businessStatus)}
                />
                <InfoItemComponent
                  icon={Call}
                  text={data?.placeDetail?.phoneNumber || '전화번호 없음'}
                />
                <InfoItemComponent
                  icon={ETC}
                  text={data?.placeDetail?.address || 'Loading...'}
                />
              </ColumnContainer>
            </RowsContainer>
          </RowContainer>

          <TravelContainer>
            <Travelo>리뷰</Travelo>
          </TravelContainer>
          <Review reviews={reviews} />

          <div style={{ marginBottom: '10vw' }} />

          <MapContainer>
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              {data.placeDetail && data.placeDetail.placeInfo && (
                <ReviewHomes
                  lat={data.placeDetail.placeInfo.lat}
                  lng={data.placeDetail.placeInfo.lng}
                  address={data.placeDetail.address}
                  placeName={data.placeDetail.placeName}
                />
              )}
            </Wrapper>
          </MapContainer>
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Detailreview;
