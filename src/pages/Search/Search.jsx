import Header from '../../components/Header/Header';
import SearchBanner from '../../assets/images/searchbanner.png';
import styled from 'styled-components';
import RowLine from '../../assets/images/Vector 213.png';
import Titleimage from '../../assets/images/titleimage.png';
import { useState } from 'react';
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
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4vw;
  margin-left: 1.8vw;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 42vw;
  align-items: center;
  margin-bottom: 2vw;
`;

const TitleContainer = styled.div`
  margin-top: 2.4vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TitleP = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const IdP = styled.p`
  color: var(--5, #707070);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TextContainer = styled.div`
  position: relative;
  margin-bottom: 10px; // 선택된 항목과 이미지 사이의 공간 조정
  cursor: pointer;

  // 선택된 항목 아래의 파란색 줄을 추가합니다.
  &::after {
    content: '';
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    position: absolute;
    bottom: -27.5px; // 하단 테두리 위치 조정
    left: -5px;
    width: 130%;
    border-bottom: 2px solid #5e81ff;
    stroke-width: 3px;
  }
`;

const BannerText = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 27vw;
  background-image: url(${SearchBanner});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TextContainer2 = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 2vw;
  align-items: center;
  justify-content: center;
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
  font-size: 1.2vw;
  border-radius: 0.5vw;
  padding: 0 3vw 0 1vw; /* 좌측 패딩을 조정해 텍스트 입력 영역을 확보하세요. */
  background: transparent;
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

const RoundImageContainer = styled.div`
  width: 5vw; // 이미지와 같은 크기
  height: 5vw; // 이미지와 같은 높이
  border-radius: 50%; // 원형 모양으로
  overflow: hidden; // 내부 이미지가 동그란 모양을 따르도록
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoundImage = styled.img`
  width: 100%;
  height: auto; // 비율 유지
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

  const handleNavigate = (item) => {
    if (selectedCategory === 'place') {
      navigate(`/Detailreview/${item.id}`);
    } else if (selectedCategory === 'user') {
      navigate(`/Userpage/${item.id}`);
    }
  };

  const handleSearch = async () => {
    const authToken = localStorage.getItem('authToken');
    const url = `https://api.hangrt.site/search/keyword?keyword=${encodeURIComponent(
      keyword
    )}`;
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
      setSearchResults(data.result);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <>
      <Header />
      <StyledBannerContainer>
        <TextContainer2>
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
        </TextContainer2>
      </StyledBannerContainer>

      <Container>
        <CreatesContainer>
          <RowContainer>
            <TextContainer
              isSelected={selectedCategory === 'album'}
              onClick={() => setSelectedCategory('album')}
            >
              <Text isSelected={selectedCategory === 'album'}>앨범명</Text>
            </TextContainer>
            <TextContainer
              isSelected={selectedCategory === 'user'}
              onClick={() => setSelectedCategory('user')}
            >
              <Text isSelected={selectedCategory === 'user'}>사용자</Text>
            </TextContainer>
            <TextContainer
              isSelected={selectedCategory === 'place'}
              onClick={() => setSelectedCategory('place')}
            >
              <Text isSelected={selectedCategory === 'place'}>장소</Text>
            </TextContainer>
            <TextContainer
              isSelected={selectedCategory === 'review'}
              onClick={() => setSelectedCategory('review')}
            >
              <Text isSelected={selectedCategory === 'review'}>리뷰</Text>
            </TextContainer>
          </RowContainer>

          <img src={RowLine} style={{ width: '59vw' }} alt="Row Line" />
          {searchResults[selectedCategory + 'List']?.map((item, index) => (
            <TitleContainer key={index} onClick={() => handleNavigate(item)}>
              <RoundImageContainer>
                <RoundImage
                  src={item.profileImg || item.mainImg || Titleimage}
                  alt="Album Image"
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
