import styled from 'styled-components';
import reviewprofile from '../../assets/images/reviewprofile.png';
import Fullstar from '../../assets/images/Star rate.png';
import Emptystar from '../../assets/images/Star.png';
import Heartimage from '../../assets/images/heartimage.png';
import { Link } from 'react-router-dom';

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Adjust to display 2 items per row */
  gap: 1.4vw;
  margin-top: 2vw;
`;

const Reviews = styled.div`
  background: #f7f7f7;
  padding: 1.4vw;
  border-radius: 0.5vw;
  min-width: 28.6vw; /* Adjusted min-width for 2 items per row */
  min-height: 16vw;
  max-height: 16vw;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NameContainer = styled.div`
  margin-left: 0.55vw;
`;

const UserName = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-weight: 500;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2vw;
`;

const StyledStar = styled.img`
  width: 0.8vw;
  height: 0.85vw;
`;

const HeartIcon = styled.img`
  width: 1vw;
  height: 0.9vw;
`;

const ContentContainer = styled.div`
  padding: 1.3vw 0;
  flex-grow: 1;
`;

const ContentText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-weight: 400;
  line-height: 1.2vw;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 0.2vw;
`;

const Reviewimage = styled.img`
  width: 6.2vw;
  height: 7vw;
`;

const Review = ({ reviews }) => {
  return (
    <ReviewGrid>
      {reviews?.map((review) => (
        <Link
          key={review.reviewId}
          to={`/detailReview/${review.reviewId}`}
          style={{ textDecoration: 'none' }}
        >
          <Reviews>
            <TitleContainer>
              <UserInfoContainer>
                <img
                  src={review.writer.user_image_url || reviewprofile}
                  alt="User Profile"
                  style={{ width: '2.75vw', height: '2.75vw' }}
                />
                <NameContainer>
                  <UserName>{review.writer.user_name}</UserName>
                  <StarContainer>
                    {[...Array(5)].map((_, index) => (
                      <StyledStar
                        key={index}
                        src={index < review.star ? Fullstar : Emptystar}
                      />
                    ))}
                  </StarContainer>
                </NameContainer>
              </UserInfoContainer>
              <HeartIcon src={Heartimage} />
            </TitleContainer>
            <ContentContainer>
              <ContentText>{review.content}</ContentText>
            </ContentContainer>
            <ImageContainer>
              {review.reviewImages.map((image, index) => (
                <Reviewimage
                  key={index}
                  src={image}
                  alt={`Review Image ${index + 1}`}
                />
              ))}
            </ImageContainer>
          </Reviews>
        </Link>
      ))}
    </ReviewGrid>
  );
};

export default Review;
