import styled from 'styled-components';
import Header from '../../components/Header/Header';
import HomeBanner from '../../assets/images/HomeBanner.png';
import Travelog from '../../components/Travelog/Travelog';
import FriendAlbum from '../../components/FriendAlbum/FriendAlbum';
import MemoryCut from '../../components/MemoryCut/MemoryCut';

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
const Home = () => {
  return (
    <>
      <Header />

      <StyledBannerContainer>
        <TextContainer>
          <BannerText2>당신의 순간으로부터,</BannerText2>
          <BannerText2>맞춤형 여행 앨범으로 추억을 되새겨 보세요!</BannerText2>
        </TextContainer>
      </StyledBannerContainer>

      <Container>
        <Travelog />
        {/* <FriendAlbum /> */}
        <MemoryCut />
      </Container>
    </>
  );
};

export default Home;
