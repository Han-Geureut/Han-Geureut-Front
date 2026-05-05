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
import { useParams } from 'react-router-dom';
import ReviewHomes from './ReviewHomes';
import LeftButtonImage from '../../assets/images/leftbutton.png';
import RightButtonImage from '../../assets/images/rightbutton.png';
import RevieweBanner from '../../assets/images/globe.png';

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: clamp(220px, 27vw, 460px);
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
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
  width: min(1080px, 88%);
  margin-top: clamp(24px, 4vw, 72px);
  margin-bottom: clamp(40px, 6vw, 96px);
  align-items: stretch;
  gap: clamp(20px, 3vw, 44px);
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: clamp(20px, 3vw, 40px);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(10px, 1.2vw, 20px);
  padding-top: clamp(4px, 0.5vw, 10px);
`;

const SideMapContainer = styled.div`
  width: clamp(480px, 52vw, 720px);
  height: clamp(240px, 26vw, 360px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f3f3f3;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const InfoText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: clamp(13px, 0.9vw, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  white-space: pre-line; /* Preserve newlines */
  max-width: 520px;
`;

const InfoIcon = styled.img`
  width: clamp(18px, 1.6vw, 24px);
  height: clamp(18px, 1.6vw, 24px);
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

const SectionDivider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #e5e5e5;
  margin: 0.4vw 0 0.2vw;
`;

const Travelo = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: clamp(24px, 1.8vw, 34px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Detailreview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bannerImageSrc, setBannerImageSrc] = useState(RevieweBanner);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search/placeDetail/${id}`,
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
          `${process.env.REACT_APP_API_URL}/api/reviews/places/${id}?page=1&pageCount=10`,
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

  useEffect(() => {
    setBannerImageSrc(data?.placeDetail?.placePhotoUrl || RevieweBanner);
  }, [data]);

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
          <BannerImage
            src={bannerImageSrc}
            onError={() => setBannerImageSrc(RevieweBanner)}
          />
          <BannerText>{data?.placeDetail?.placeName}</BannerText>
        </ImgContainer>
      </BannerContainer>

      <Container>
        <CreatesContainer>
          <RowContainer>
            <ColumnContainer>
              <SideMapContainer>
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
              </SideMapContainer>
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

          <SectionDivider />

          <TravelContainer>
            <Travelo>Review</Travelo>
          </TravelContainer>
          <Review
            reviews={reviews}
            showArrow={false}
            enableDelete={true}
            onDeleteReview={(reviewId) =>
              setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId))
            }
          />
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Detailreview;
