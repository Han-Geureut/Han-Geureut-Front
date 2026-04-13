import styled from 'styled-components';
import Createphoto1 from '../../assets/images/createphoto1.png';
import Createphoto2 from '../../assets/images/createphoto2.png';
import Createphoto3 from '../../assets/images/createphoto3.png';
import Createphoto4 from '../../assets/images/createphoto4.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 59%;
  margin-bottom: 7.5vw;
  height: 100vw;
  align-items: center;
  background-color: pink;
`;

const ImageContainer = styled.div`
  width: 58.8vw;
  height: 66.8vw;
  flex-shrink: 0;
  background-color: gray;
  display: flex;
  flex-direction: row;
`;

const DayAlbum = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  align-self: flex-start;
`;

const AlbumPhoto = () => {
  return (
    <>
      <Container>
        <CreatesContainer>
          <DayAlbum>Day 1 앨범</DayAlbum>
          <ImageContainer>
            <img
              src={Createphoto1}
              style={{ width: '14.7vw', height: '16.7vw' }}
              alt=""
            />
            <img
              src={Createphoto2}
              style={{ width: '14.7vw', height: '16.7vw' }}
              alt=""
            />
            <img
              src={Createphoto3}
              style={{ width: '14.7vw', height: '16.7vw' }}
              alt=""
            />
            <img
              src={Createphoto4}
              style={{ width: '14.7vw', height: '16.7vw' }}
              alt=""
            />
          </ImageContainer>
        </CreatesContainer>
      </Container>
      ;
    </>
  );
};

export default AlbumPhoto;
