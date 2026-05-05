import styled from 'styled-components';
import Fullstar from '../../assets/images/Star rate.png';
import Emptystar from '../../assets/images/Star.png';
import Trash from '../../assets/images/trash-2.png';
import RightDirection from '../../assets/images/rightdirection.png';
import { useNavigate } from 'react-router-dom';

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Adjust to display 2 items per row */
  gap: 1.4vw;
  margin-top: 0.6vw;
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
  margin-left: 0;
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

const DetailArrow = styled.img`
  width: 0.7vw;
  height: 1.1vw;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  width: 1.05vw;
  height: 1.05vw;
  cursor: pointer;
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

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.7vw;
`;

const Review = ({ reviews, showArrow = true, enableDelete = false, onDeleteReview }) => {
  const navigate = useNavigate();

  const handleDeleteReview = async (reviewId) => {
    const authToken = localStorage.getItem('authToken');
    const isConfirmed = window.confirm('이 리뷰를 삭제하시겠어요?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete review with status: ${response.status}`);
      }

      if (onDeleteReview) {
        onDeleteReview(reviewId);
      }
      alert('리뷰가 삭제되었습니다!');
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  return (
    <ReviewGrid>
      {reviews?.map((review) => (
        <Reviews key={review.reviewId}>
          <TitleContainer>
            <UserInfoContainer>
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
            {showArrow && (
              <DetailArrow
                src={RightDirection}
                alt="Review Detail"
                onClick={() => navigate(`/detailReview/${review.reviewId}`)}
              />
            )}
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
          {enableDelete && (
            <CardFooter>
              <DeleteIcon
                src={Trash}
                alt="Delete Review"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteReview(review.reviewId);
                }}
              />
            </CardFooter>
          )}
        </Reviews>
      ))}
    </ReviewGrid>
  );
};

export default Review;
