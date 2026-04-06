import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAlbum } from '../../AlbumContext/AlbumContext';
import Header from '../../components/Header/Header';
import CreateBanner from '../../assets/images/CreateBanner.png';
import CircleLine from '../../assets/images/creates3.png';
import Photocamera from '../../assets/images/Photo camera.png';
import Cancel from '../../assets/images/Cancel.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 5.4vw;
  margin-bottom: 7.5vw;
  height: 25vw;
  align-items: center;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 27vw;
`;

const NameText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CreateContainer = styled.div`
  margin-top: 7.5vw;
  display: flex;
  flex-direction: column;
`;

const PhotoAddContainer = styled.div`
  width: 42.4vw;
  height: 3.2vw;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  margin-top: 1.6vw;
  color: var(--3, #a0a0a0);
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 0.8vw 0 1.2vw;
  margin-bottom: 1vw;
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽 요소 사이에 공간을 균등하게 분배 */
  align-items: center;
`;

const PhotoIcon = styled.img`
  cursor: pointer; /* 클릭 가능한 아이콘 표시 */
  width: 1.6vw;
  height: 1.6vw;
`;

const AlbumField = styled.input``;

const RequiredText = styled.p`
  color: var(--5, #707070);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 0.5vw;
`;

const CancelButton = styled.button`
  width: 7vw;
  height: 2.8vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  background: var(--2, #e1e1e1);
  color: #000;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
`;

const SubmitButton = styled.button`
  width: 7vw;
  height: 2.8vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  background: #5e81ff;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 4.5vw;
`;

const PhotoSelectText = styled.p`
  color: var(--3, #a0a0a0);
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const BannerText = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 27vw;
  background-image: url(${CreateBanner});
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

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.3vw;
  flex-wrap: wrap;
  align-items: center;
  width: 42.4vw;
  justify-content: flex-start;
`;

const SelectedPhoto = styled.div`
  max-width: calc(
    (100% / 6) - 1vw
  ); // 한 줄에 최대 6개의 항목이 들어가도록 최대 너비 설정
  height: 6vw;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  position: relative;
  margin-bottom: 1.3vw;
`;

const StyledImage = styled.img`
  width: 4vw;
  height: 5.9vw;
  object-fit: cover;
`;

const CancelIcon = styled.img`
  position: absolute;
  top: 1px;
  right: 1px;
  width: 0.8vw;
  height: 0.8vw;
  cursor: pointer;
`;

const Creates3 = () => {
  const navigate = useNavigate();
  const { images, setImages } = useAlbum();

  const goToCreates2 = () => {
    navigate('/creates2');
  };

  const goToCreates4 = () => {
    if (images.length === 0) {
      alert('사진을 하나 이상 추가해주세요.');
      return; // 함수를 여기서 종료하고 더 이상 진행하지 않음
    }
    navigate('/Creates4');
  };

  const triggerFileSelect = () => {
    document.getElementById('photoUpload').click();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newPhotos = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  return (
    <>
      <Header />
      <StyledBannerContainer>
        <TextContainer>
          <BannerText>여행의 순간을 담아</BannerText>
          <BannerText>당신만의 여행 앨범을 만들어보세요.</BannerText>
        </TextContainer>
      </StyledBannerContainer>
      <Container>
        <CreatesContainer>
          <img src={CircleLine} style={{ width: '42.4vw', height: '1.6vw' }} />
          <CreateContainer>
            <NameText>사진 추가하기</NameText>
            <PhotoAddContainer>
              <PhotoSelectText>사진을 선택해주세요</PhotoSelectText>
              <PhotoIcon src={Photocamera} onClick={triggerFileSelect} />
              <HiddenFileInput
                type="file"
                id="photoUpload"
                accept="image/*"
                onChange={handleFileSelect}
                multiple
              />
            </PhotoAddContainer>
            <RowContainer>
              {images.map((photo, index) => (
                <SelectedPhoto key={index}>
                  <StyledImage src={photo.url} alt={`Selected ${index}`} />
                  <CancelIcon
                    src={Cancel}
                    alt="Cancel"
                    onClick={() => {
                      setImages((prevPhotos) =>
                        prevPhotos.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </SelectedPhoto>
              ))}
            </RowContainer>
          </CreateContainer>
          <ButtonContainer>
            <CancelButton onClick={goToCreates2}>취소하기</CancelButton>
            <SubmitButton onClick={goToCreates4}>다음으로</SubmitButton>
          </ButtonContainer>
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Creates3;
