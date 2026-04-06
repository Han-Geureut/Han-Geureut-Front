import styled from 'styled-components';
import Header from '../../components/Header/Header';
import CreateBanner from '../../assets/images/CreateBanner.png';
import CircleLine from '../../assets/images/creates2.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlbum } from '../../AlbumContext/AlbumContext';
import { useEffect } from 'react';
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

const AlbumField = styled.input`
  width: 42.4vw;
  height: 3.2vw;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  margin-top: 1.6vw;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 1.35vw;
  margin-bottom: 1vw;
  color: #000;

  ::placeholder {
    color: var(--3, #a0a0a0);
  }
`;

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

const Creates2 = () => {
  const { albumInfo, setAlbumInfo } = useAlbum();

  const navigate = useNavigate();

  const goToCreates1 = () => {
    navigate('/creates1');
  };

  const goToCreates3 = () => {
    if (!albumInfo.trim()) {
      alert('앨범 설명을 입력해주세요.');
    } else {
      console.log('앨범 설명:', albumInfo);
      navigate('/creates3');
    }
  };

  const handleAlbumInfoChange = (event) => {
    setAlbumInfo(event.target.value); // 입력 필드의 값을 상태로 설정
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
            <NameText>앨범 설명</NameText>
            <AlbumField
              placeholder="앨범 설명을 입력해주세요"
              value={albumInfo}
              onChange={handleAlbumInfoChange}
              maxLength={50}
            ></AlbumField>
            <RequiredText>*최대 50자 이내</RequiredText>
          </CreateContainer>
          <ButtonContainer>
            <CancelButton onClick={goToCreates1}>이전으로</CancelButton>
            <SubmitButton onClick={goToCreates3}>다음으로</SubmitButton>
          </ButtonContainer>
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Creates2;
