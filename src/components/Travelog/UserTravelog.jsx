import styled from 'styled-components';
import Travel from '../../assets/images/Travelogimage.png';
import Share from '../../assets/images/share.png';
import { Link, useParams } from 'react-router-dom';
import EmptyHeart from '../../assets/images/emptywhite.png';
import FilledHeart from '../../assets/images/heart.png';
import { useState } from 'react';
import { useContext } from 'react';
import { AlbumProvider, useAlbum } from '../../AlbumContext/AlbumContext';
import { useEffect } from 'react';
import Header from '../Header/Header';
import HomeBanner from '../../assets/images/HomeBanner.png';
import arrowIcon from '../../assets/images/arrow_12px2.png';
import arrow_12px from '../../assets/images/arrow_12px.png';
import Trash from '../../assets/images/trash-2.png';

const StyledLink = styled(Link)`
  text-decoration: none; // 링크의 밑줄 제거
  color: inherit; // 상속받은 색상을 사용
  display: flex; // 원래와 같이 flex로 설정
  flex-direction: column;
`;
const TravelContainer = styled.div`
  display: flex;
  align-self: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 7.65vw;
  margin-bottom: 7.5vw;
  height: 200vw;
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
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 아이콘 간 간격을 10px로 설정
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
  flex-grow: 1;
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
  line-height: 1.2vw; /* 171.429% */
`;

const heartStyle = {
  position: 'absolute',
  right: '1vw',
  top: '1vw',
  width: '1.3vw',
  height: '1.3vw',
  cursor: 'pointer', // 마우스 포인터를 손가락 모양으로 변경
};

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 27vw;
  background-image: url(${HomeBanner});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BannerText2 = styled.p`
  color: #fff;
  font-family: SUIT;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Container = styled.div`
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

const UserTravelog = ({ title = 'Travelog' }) => {
  const [albums, setAlbums] = useState([]); // 앨범 데이터를 저장할 상태
  const [hearts, setHearts] = useState(new Array(6).fill(false));
  const [sortStatus, setSortStatus] = useState('_POPULAR');
  const [totalAlbums, setTotalAlbums] = useState(0);
  const { id } = useParams();

  const [page, setPage] = useState(1); // 페이지 번호
  const [pageCount, setPageCount] = useState(9);

  const totalPages = Math.ceil(totalAlbums / pageCount);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const url = new URL(`${process.env.REACT_APP_API_URL}/api/album/users/${id}`);
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
        console.log('특정사용자', data);

        if (data.isSuccess && data.result) {
          setAlbums(data.result.albums);
          setHearts(data.result.albums.map((album) => album.likedByUser));
          setTotalAlbums(data.result.totalElements);
        } else {
          setTotalAlbums(0);
        }
      } catch (e) {
        console.error('Failed to fetch album data:', e);
        setTotalAlbums(0);
      }
    };

    fetchData();
  }, [id, sortStatus, page, pageCount]);

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
        window.location.reload(); // 페이지 새로고침
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

  const handleLike = async (albumId, index) => {
    // 로컬 상태를 먼저 업데이트
    const newHearts = [...hearts];
    newHearts[index] = !newHearts[index];
    setHearts(newHearts);

    // authToken 가져오기
    const authToken = localStorage.getItem('authToken');

    // API 요청 보내기
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

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const authToken = localStorage.getItem('authToken');
  //       const url = new URL('https://api.memoraize.kr/api/album');
  //       const params = { sortStatus, page, pageCount };
  //       url.search = new URLSearchParams(params).toString();

  //       try {
  //         const response = await fetch(url, {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //             'Content-Type': 'application/json',
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         console.log(data);

  //         if (data.isSuccess && data.result) {
  //           setAlbums(data.result.albums);
  //           setHearts(data.result.albums.map((album) => album.likedByUser));
  //           setTotalAlbums(data.result.totalElements);
  //         } else {
  //           setTotalAlbums(0);
  //         }
  //       } catch (e) {
  //         console.error('Failed to fetch album data:', e);
  //         setTotalAlbums(0);
  //       }
  //     };

  //     fetchData();
  //   }, [sortStatus, page, pageCount]);

  return (
    <>
      <Header />

      <StyledBannerContainer>
        <TextContainer>
          <BannerText2>Travelog</BannerText2>
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
          </ButtonContainerWrapper>
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
                        src={Share}
                        style={{ width: '0.8vw', height: '0.9vw' }}
                        alt="Share Icon"
                      />
                    </IconContainer>
                  </TitleContainer>
                  <Made>{new Date(album.createdAt).toLocaleDateString()}</Made>
                </Detail>
              </Album>
            ))}
          </AlbumContainer>

          {totalPages > 0 && ( // 조건 추가
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

export default UserTravelog;
