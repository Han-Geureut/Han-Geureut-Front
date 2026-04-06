import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Danang from '../../assets/images/danang.png';
import LeftButtonImage from '../../assets/images/leftbutton.png';
import RightButtonImage from '../../assets/images/rightbutton.png';
import AlbumPhoto from '../../components/AlbumPhoto/AlbumPhoto';
import { useParams } from 'react-router-dom';
import { AlbumData } from '../../components/Travelog/Travelog';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin-top: 5.4vw;
  margin-bottom: 7.5vw;
  height: 22vw;
  align-items: center;
  background-color: yellow;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;

const TitleComponent = styled.div`
  position: relative;
  width: 25vw;
  height: 21.2vw;
  flex-shrink: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.75vw;
`;

const DayText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 2.2vw;
`;

const TitleText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 2.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 0.6vw;
`;

const DateText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const LeftButton = styled.img`
  flex-shrink: 0;
  width: 3.9vw;
  height: 3.9vw;
  margin-left: -2vw;
`;

const RightButton = styled.img`
  flex-shrink: 0;
  width: 3.9vw;
  height: 3.9vw;
  margin-left: -2vw;
`;

const Created = () => {
  const { id } = useParams();
  const album = AlbumData.find((a) => a.id === parseInt(id));

  return (
    <>
      <Header />
      <Container>
        <CreatesContainer>
          <RowContainer>
            <TitleComponent>
              <FlexContainer>
                <LeftButton src={LeftButtonImage} alt="Left Button" />
                <ColumnContainer>
                  <DayText>Day 1</DayText>
                  <TitleText>
                    {album ? album.title : 'Album not found'}
                  </TitleText>
                  <DateText>2020.01.02 - 01.09</DateText>
                </ColumnContainer>
              </FlexContainer>
            </TitleComponent>
            <img
              src={Danang}
              style={{ width: '100%', height: '21.2vw' }}
              alt="Danang"
            />
            <FlexContainer>
              <RightButton src={RightButtonImage} alt="Right Button" />
            </FlexContainer>
          </RowContainer>
        </CreatesContainer>
      </Container>

      <AlbumPhoto />
    </>
  );
};

export default Created;
