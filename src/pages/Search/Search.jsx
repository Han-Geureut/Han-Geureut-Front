import Header from '../../components/Header/Header';
import SearchBanner from '../../assets/images/searchbanner.png';
import styled from 'styled-components';
import RowLine from '../../assets/images/Vector 213.png';
import Titleimage from '../../assets/images/titleimage.png';
import { useState, useEffect } from 'react'; // 🔥 useEffect 추가
import { useNavigate } from 'react-router-dom';

const BannerContainer = styled.div`
  width: 100%;
  height: 27vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 6.85vw;
  margin-bottom: 5vw;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 6vw;
`;

const Text = styled.p`
  color: ${(props) => (props.isSelected ? '#000' : 'var(--5, #707070)')};
  font-family: Pretendard;
  font-size: 1.2vw;
  font-weight: 500;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
  margin-left: 1.8vw;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 42vw;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin-top: 2.4vw;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TitleP = styled.p`
  font-size: 1vw;
`;

const IdP = styled.p`
  font-size: 0.8vw;
  color: #707070;
`;

const TextContainer = styled.div`
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    position: absolute;
    bottom: -27.5px;
    width: 130%;
    border-bottom: 2px solid #5e81ff;
  }
`;

const BannerText = styled.p`
  color: #fff;
  font-size: 3vw;
  font-weight: 800;
`;

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 27vw;
  background-image: url(${SearchBanner});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer2 = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 2vw;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  width: 58.95vw;
  height: 3vw;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.2vw;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const RoundImageContainer = styled.div`
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  overflow: hidden;
`;

const RoundImage = styled.img`
  width: 100%;
`;

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState('album');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState({
    albumList: [],
    userList: [],
    placeList: [],
  });

  // 🔥 핵심 추가: 처음 들어오면 전체 앨범 불러오기
  useEffect(() => {
    const fetchAllAlbums = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search/albums`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        setSearchResults((prev) => ({
          ...prev,
          albumList: data.result,
        }));

      } catch (error) {
        console.error("앨범 불러오기 실패:", error);
      }
    };

    fetchAllAlbums();
  }, []);

  const handleNavigate = (item) => {
    if (selectedCategory === 'place') {
      navigate(`/Detailreview/${item.id}`);
    } else if (selectedCategory === 'user') {
      navigate(`/Userpage/${item.id}`);
    }
  };

  const handleSearch = async () => {
    const authToken = localStorage.getItem('authToken');

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/search/keyword?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await response.json();
    setSearchResults(data.result);
  };

  return (
    <>
      <Header />

      <StyledBannerContainer>
        <TextContainer2>
          <BannerText>Search</BannerText>

          <SearchBarContainer>
            <SearchInput
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색"
            />
            <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
              🔍
            </div>
          </SearchBarContainer>
        </TextContainer2>
      </StyledBannerContainer>

      <Container>
        <CreatesContainer>

          <RowContainer>
            <TextContainer onClick={() => setSelectedCategory('album')}>
              <Text isSelected={selectedCategory === 'album'}>앨범명</Text>
            </TextContainer>
            <TextContainer onClick={() => setSelectedCategory('user')}>
              <Text isSelected={selectedCategory === 'user'}>사용자</Text>
            </TextContainer>
            <TextContainer onClick={() => setSelectedCategory('place')}>
              <Text isSelected={selectedCategory === 'place'}>장소</Text>
            </TextContainer>
          </RowContainer>

          <img src={RowLine} style={{ width: '59vw' }} alt="" />

          {searchResults[selectedCategory + 'List']?.map((item, index) => (
            <TitleContainer key={index} onClick={() => handleNavigate(item)}>
              <RoundImageContainer>
                <RoundImage
                  src={item.profileImg || item.mainImg || Titleimage}
                />
              </RoundImageContainer>

              <ColumnContainer>
                <TitleP>
                  {item.albumName ||
                    item.context ||
                    item.placeName ||
                    item.userName}
                </TitleP>

                <IdP>
                  {item.userId || item.userName
                    ? `@${item.userId || item.userName}`
                    : ''}
                </IdP>
              </ColumnContainer>
            </TitleContainer>
          ))}

        </CreatesContainer>
      </Container>
    </>
  );
};

export default Search;