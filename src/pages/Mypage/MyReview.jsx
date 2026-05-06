import styled from 'styled-components';
import Fullstar from '../../assets/images/Star rate.png';
import Emptystar from '../../assets/images/Star.png';
import Trash from '../../assets/images/trash-2.png';
import RightDirection from '../../assets/images/rightdirection.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

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

const DeleteIcon = styled.img`
  width: 1.05vw;
  height: 1.05vw;
  cursor: pointer;
`;

const DetailArrow = styled.img`
  width: 0.7vw;
  height: 1.1vw;
  cursor: pointer;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
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

const MyReview = ({ page = 1, pageCount = 10 }) => {
  const [reviews, setReviews] = useState([]);
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

      setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
      alert('리뷰가 삭제되었습니다!');
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const authToken = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId'); // sessionStorage에서 userId 가져오기

      if (!userId) {
        console.error('No userId found in sessionStorage');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/reviews/users?userId=${userId}&page=${page}&pageCount=${pageCount}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch reviews with status: ${response.status}`
          );
        }

        const data = await response.json();
        setReviews(data.result.reviewList || []);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [page, pageCount]);

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
            <DetailArrow
              src={RightDirection}
              alt="Review Detail"
              onClick={() => navigate(`/detailReview/${review.reviewId}`)}
            />
          </TitleContainer>
          <ContentContainer>
            <ContentText>{review.content}</ContentText>
          </ContentContainer>
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
        </Reviews>
      ))}
    </ReviewGrid>
  );
};

export default MyReview;
