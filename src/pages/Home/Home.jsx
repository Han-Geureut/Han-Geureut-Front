import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HomeBanner from '../../assets/images/HomeBanner.png';
import Travelog from '../../components/Travelog/Travelog';
import FriendAlbum from '../../components/FriendAlbum/FriendAlbum';

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

const AlbumCreateButton = styled(Link)`
  margin-top: 1vw;
  padding: 1vw 2.8vw;
  border-radius: 0.2vw;
  background: #ff6b00;
  color: #fff;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.92;
  }
`;

const Home = () => {
  return (
    <>
      <Header />

      <StyledBannerContainer>
        <TextContainer>
          <BannerText2>맛있는 순간을,</BannerText2>
          <BannerText2>한그릇에 다같이 담다</BannerText2>
          <AlbumCreateButton to="/Creates1">앨범 생성</AlbumCreateButton>
        </TextContainer>
      </StyledBannerContainer>

      <Container>
        <Travelog title="Foodlog" />
        {/* <FriendAlbum /> */}
      </Container>
    </>
  );
};

export default Home;
