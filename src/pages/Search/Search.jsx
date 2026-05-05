import Header from '../../components/Header/Header';
import SearchBanner from '../../assets/images/searchbanner.png';
import SearchLogo from '../../assets/images/searchLogo.png';
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
  gap: 9vw;
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
  margin-left: ${(props) => (props.noImage ? '0' : '1.8vw')};
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
  padding: 0.9vw 1vw;
  border: 1px solid transparent;
  border-radius: 0.7vw;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;

  &:hover {
    border-color: #d9d9d9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background: #fff;
  }
`;

const TitleP = styled.p`
  font-size: 1.12vw;
  font-weight: 600;
`;

const IdP = styled.p`
  font-size: 0.92vw;
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
    border-bottom: 2px solid #ff6b00;
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
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 0.6vw 0 1vw;
  box-sizing: border-box;
  gap: 0.5vw;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  font-size: 1.2vw;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0.2vw;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const SearchIconImg = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  min-width: 20px;
  min-height: 20px;
  object-fit: contain;
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

  // 진입 시 빈 키워드로 앨범·사용자·장소 전체 목록 로드 (돋보기와 동일 응답)
  useEffect(() => {
    const loadInitialLists = async () => {
      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search/keyword?keyword=`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const data = await response.json();
        const r = data.result;
        setSearchResults({
          albumList: r?.albumList ?? [],
          userList: r?.userList ?? [],
          placeList: r?.placeList ?? [],
        });
      } catch (error) {
        console.error('검색 초기 목록 불러오기 실패:', error);
      }
    };

    loadInitialLists();
  }, []);

  const handleNavigate = (item) => {
    if (selectedCategory === 'place') {
      navigate(`/Detailreview/${item.id}`);
    } else if (selectedCategory === 'album') {
      navigate(`/Template/${item.albumId || item.id}`);
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
            <SearchIconButton type="button" onClick={handleSearch} aria-label="검색">
              <SearchIconImg src={SearchLogo} alt="" />
            </SearchIconButton>
          </SearchBarContainer>
        </TextContainer2>
      </StyledBannerContainer>

      <Container>
        <CreatesContainer>

          <RowContainer>
            <TextContainer onClick={() => setSelectedCategory('album')}>
              <Text isSelected={selectedCategory === 'album'}>앨범명</Text>
            </TextContainer>
            <TextContainer onClick={() => setSelectedCategory('place')}>
              <Text isSelected={selectedCategory === 'place'}>장소</Text>
            </TextContainer>
            <TextContainer onClick={() => setSelectedCategory('user')}>
              <Text isSelected={selectedCategory === 'user'}>사용자</Text>
            </TextContainer>
          </RowContainer>

          <img src={RowLine} style={{ width: '59vw' }} alt="" />

          {searchResults[selectedCategory + 'List']?.map((item, index) => (
            <TitleContainer key={index} onClick={() => handleNavigate(item)}>
              {selectedCategory === 'album' && (
                <RoundImageContainer>
                  <RoundImage
                    src={item.profileImg || item.mainImg || Titleimage}
                  />
                </RoundImageContainer>
              )}

              <ColumnContainer noImage={selectedCategory !== 'album'}>
                <TitleP>
                  {item.albumName || item.context || item.placeName || item.userName}
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