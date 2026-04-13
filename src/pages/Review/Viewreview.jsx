import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Review from '../../components/Review/Review';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import arrowIcon from '../../assets/images/arrow_12px2.png';
import RevieweBanner from '../../assets/images/searchbanner.png';

const BannerContainer = styled.div`
  width: 100%;
  height: 27vw;
`;

const PaginationImg = styled.img`
  width: 1.25vw;
  height: 1.25vw;
  margin-right: 1.25vw;
`;
const PaginationImg2 = styled.img`
  width: 1.25vw;
  height: 1.25vw;
  transform: rotate(180deg);
  margin-left: 1.25vw;
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
  height: 50vw;
  align-items: center;
`;

const ButtonContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1vw;
`;

const NewButton = styled.button`
  display: inline-flex;
  padding: 1vw 2vw;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  border-radius: 2.5vw;
  background: #0034ed;
  color: #fff;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PopularButton = styled.button`
  display: inline-flex;
  padding: 1vw 2vw;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  border-radius: 2.5vw;
  border: 1px solid #0034ed;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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

const PaginationContainer = styled.div`
  margin-top: 3.4375vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationNumber = styled.div`
  display: inline-flex;
  margin-right: 1.3021vw;
  padding: 0.2083vw;
  justify-content: center;
  align-items: center;
  color: var(--Gray-Gray-700, #464a4d);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.625vw;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 0.9375vw */
  letter-spacing: -0.0187vw;

  &:active {
    border-radius: 5.2083vw;
    background: var(--Primary-Red-200, #fff6f7);
    color: var(--Primary-Red-900, #e95458);
    text-align: center;
    font-family: Inter;
    font-size: 0.625vw;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Button = styled.button`
  display: inline-flex;
  padding: 1vw 2vw;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  border-radius: 2.5vw;
  border: 1px solid #0034ed;
  background: ${(props) => (props.active ? '#0034ed' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 27vw;
  background-image: url(${RevieweBanner});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 2vw;
  align-items: center;
  justify-content: center;
`;

const BannerText = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 58.95vw;
  height: 3vw;
  border-radius: 0.2vw;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.5vw;
  padding: 0 3vw 0 1vw; /* 좌측 패딩을 조정해 텍스트 입력 영역을 확보하세요. */
  background: transparent;
  font-size: 1.2vw;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #fff;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.4vw;
  width: 1.4vw;
  height: 1.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationComponent = ({ page, totalPages, handlePageChange }) => {
  return (
    <PaginationContainer>
      {page > 1 && (
        <PaginationImg
          src={arrowIcon}
          alt="Prev Page"
          onClick={() => handlePageChange(page - 1)}
        />
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationNumber
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          style={{
            fontWeight: page === i + 1 ? 'bold' : 'normal',
          }}
        >
          {i + 1}
        </PaginationNumber>
      ))}
      {page < totalPages && (
        <PaginationImg2
          src={arrowIcon}
          alt="Next Page"
          onClick={() => handlePageChange(page + 1)}
        />
      )}
    </PaginationContainer>
  );
};

const Viewreview = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [sortStatus, setSortStatus] = useState('_POPULAR');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(6);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const MakeReview = () => {
    navigate('/Writereview');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = async () => {
    const authToken = localStorage.getItem('authToken');
    const url = new URL(
      '${process.env.REACT_APP_API_URL}/api/reviews/places/${placeId}'
    );
    const params = { keyword, page, pageCount };
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
      setSearchResults(data.result.reviewList);
      setTotalPages(data.result.totalPages || 0);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const url = new URL('${process.env.REACT_APP_API_URL}/api/reviews');
      const params = { sortStatus, page, pageCount };
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
        console.log(data);

        // 배열 여부 확인 후 상태 업데이트
        if (Array.isArray(data.result.reviewList)) {
          setReviews(data.result.reviewList);
        } else {
          setReviews([]);
        }

        setTotalPages(data.result.totalPages || 0); // API가 이 데이터를 제공한다고 가정
      } catch (e) {
        console.error('Failed to fetch reviews:', e);
        setReviews([]); // 오류가 발생하면 빈 배열로 설정
      }
    };

    fetchData();
  }, [sortStatus, page, pageCount]);

  return (
    <>
      <Header />
      <StyledBannerContainer>
        <TextContainer>
          <BannerText>Search</BannerText>
          <SearchBarContainer>
            <SearchInput
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="무엇이든 검색하세요"
            />
            <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4vw"
                height="1.4vw"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M18.0833 16.3333H17.1617L16.835 16.0183C17.9783 14.6883 18.6667 12.9617 18.6667 11.0833C18.6667 6.895 15.2717 3.5 11.0833 3.5C6.895 3.5 3.5 6.895 3.5 11.0833C3.5 15.2717 6.895 18.6667 11.0833 18.6667C12.9617 18.6667 14.6883 17.9783 16.0183 16.835L16.3333 17.1617V18.0833L22.1667 23.905L23.905 22.1667L18.0833 16.3333ZM11.0833 16.3333C8.17833 16.3333 5.83333 13.9883 5.83333 11.0833C5.83333 8.17833 8.17833 5.83333 11.0833 5.83333C13.9883 5.83333 16.3333 8.17833 16.3333 11.0833C16.3333 13.9883 13.9883 16.3333 11.0833 16.3333Z"
                  fill="black"
                />
              </svg>
            </SearchIcon>
          </SearchBarContainer>
        </TextContainer>
      </StyledBannerContainer>
      <Container>
        <CreatesContainer>
          <ButtonContainerWrapper>
            <ButtonContainer>
              <Button
                active={sortStatus === '_POPULAR'}
                onClick={() => setSortStatus('_POPULAR')}
              >
                Popular
              </Button>
              <Button
                active={sortStatus === '_LATEST'}
                onClick={() => setSortStatus('_LATEST')}
              >
                New
              </Button>
            </ButtonContainer>
            {/* <ButtonContainer>
              <FollowButton onClick={MakeReview}>리뷰 쓰기</FollowButton>
            </ButtonContainer> */}
          </ButtonContainerWrapper>

          {searchResults.length > 0 ? (
            <Review reviews={searchResults} />
          ) : (
            <Review reviews={reviews} />
          )}

          {totalPages > 0 && (
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Viewreview;
