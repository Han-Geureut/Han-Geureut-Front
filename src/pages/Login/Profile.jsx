import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Default from '../../assets/images/Rectangle.png';
import PencilIcon from '../../assets/images/camerabutton.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 4vw;
  height: 50vw;
  align-items: center;
`;

const ProfileText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 1.85vw;
`;

const ProfileImage = styled.div`
  width: 12vw;
  height: 12vw;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  background-image: url(${(props) => props.image || Default});
  position: relative;
`;

const PencilButton = styled.button`
  position: absolute;
  bottom: 0.5vw;
  right: 0.1vw;
  background: url(${PencilIcon}) no-repeat center;
  background-size: contain;
  width: 3vw;
  height: 3vw;
  border: none;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 15%;
`;

const Field = styled.div`
  width: 25vw;
  height: 2.4vw;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  color: var(--6, #414141);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-items: center;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.35vw;
  align-items: center;
  margin-bottom: 2vw;
  margin-top: 3.9vw;
`;

const IdField = styled.input`
  width: 25vw;
  height: 2.4vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  border: 0.1vw solid #e1e1e1;
  background: #f7f7f7;
  padding-right: 6vw;
  font-size: 1vw;
  padding-left: 0.5vw;
`;

const AllFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background: #0034ed;
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
  margin-top: 2vw;
`;

const AudioUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2vw;
  padding-left: 1vw;
  width: 55%;
  background-color: rgb(255, 255, 255);
  margin-top: 2vw;
`;

const DragDropArea = styled.div`
  border: 2px dashed #000000; /* 점선 테두리 */
  border-radius: 10px;
  color: #000000;
  padding: 4vw;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2); /* 반투명 배경 */
  margin-bottom: 2vw;
  font-size: 1vw;
`;

const AudioPreview = styled.audio`
  margin-top: 2vw;
  margin-bottom: 2vw;
  max-width: 100%; /* 오디오 플레이어의 최대 너비 설정 */
`;

const UploadButton = styled.label`
  background-color: #0034ed;
  border: none;
  color: #ffffff;
  padding: 1vw 2vw; /* 패딩을 조절하여 버튼 크기 조정 가능 */
  font-family: Pretendard;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
  width: 10vw; /* 버튼 너비를 15vw로 설정 */
  display: block; /* 블록 레벨 요소로 만들어 너비 적용 */
  margin: 0 auto; /* 가운데 정렬 */
  margin-bottom: 2vw;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadText = styled.p`
  color: #000000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 1vw;
`;

const DetailText = styled.p`
  color: #000000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 4vw;
`;

const Profile = () => {
  const [profileImage, setProfileImage] = useState(Default);
  const hiddenFileInput = React.useRef(null);
  const [profile, setProfile] = useState({
    user_name: '',
    user_introduction: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // 음성 관련 상태
  const [audioFile, setAudioFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [audioName, setAudioName] = useState('음성파일을 여기로 드래그하세요');

  useEffect(() => {
    if (audioSrc) {
      return () => URL.revokeObjectURL(audioSrc);
    }
  }, [audioSrc]);

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/profile/${userId}`,
          {
            method: 'GET',
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
        setProfile({
          user_name: data.result.user_name,
          user_introduction: data.result.user_introduction,
        });
        setProfileImage(data.result.image_url || Default);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem('authToken');

    const formData = new FormData();
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    } else {
      formData.append('profileImage', new Blob([]), '');
    }
    formData.append('userName', profile.user_name || '');
    formData.append('introduction', profile.user_introduction || '');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/profile`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfileImage(data.result.image_url || Default);
      console.log('Profile updated successfully:', data);
      alert('프로필 수정이 완료되었습니다');
      // Handle successful update (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDropAudio = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && /audio\/(mp3|wav|m4a)$/.test(file.type)) {
      setAudioFile(file);
      setAudioSrc(URL.createObjectURL(file)); // Update the source for audio preview
      setAudioName(file.name); // Update the audio file name
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('sample', file);
      console.log(file);

      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/voice', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log('Audio upload successful');
          const responseData = await response.text();
          console.log(responseData);

          setAudioSrc(URL.createObjectURL(file));
          setAudioName(file.name);
        } else {
          const errorText = await response.text();
          console.error('Error uploading audio:', errorText);
          alert('Error occurred: ' + errorText);
        }
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ProfileContainer>
          <ProfileText>Profile</ProfileText>
          <ProfileImage image={profileImage}>
            <PencilButton onClick={handleClick} />
            <HiddenFileInput
              type="file"
              ref={hiddenFileInput}
              onChange={handleImageChange}
              accept="image/*"
            />
          </ProfileImage>
          <form onSubmit={handleSubmit}>
            <AllFieldContainer>
              <FieldContainer>
                <Text>닉네임</Text>
                <IdField
                  name="user_name"
                  value={profile.user_name}
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <Text>한 줄 소개</Text>
                <IdField
                  name="user_introduction"
                  value={profile.user_introduction}
                  onChange={handleInputChange}
                />
              </FieldContainer>
            </AllFieldContainer>
            <ButtonContainer>
              <CancelButton type="button">취소하기</CancelButton>
              <SubmitButton type="submit">저장하기</SubmitButton>
            </ButtonContainer>
          </form>
          <AudioUploadContainer>
            <UploadText>음성 업로드</UploadText>
            <DetailText>
              음성 파일을 업로드하여 AI 음성 합성 기능을 활용해보세요.
              <br />
              음성 데이터가 충분할수록 결과물의 질이 향상되므로, 최소 1분 분량의
              녹음을 권장합니다.
              <br />
              업로드 가능한 파일 형식은 .mp3, .wav, .m4a입니다.
              <br />
              파일 크기는 최대 2MB까지 가능합니다.
            </DetailText>
            <UploadText>미리듣기</UploadText>
            {audioSrc && <AudioPreview src={audioSrc} controls />}
            <DragDropArea onDragOver={handleDragOver} onDrop={handleDropAudio}>
              {audioName}
            </DragDropArea>
            <UploadButton htmlFor="audio-upload">업로드하기</UploadButton>
            <HiddenInput
              id="audio-upload"
              type="file"
              accept="audio/mp3, audio/wav, audio/mp4, audio/x-m4a"
              onChange={handleAudioUpload}
            />
          </AudioUploadContainer>
        </ProfileContainer>
      </Container>
    </>
  );
};

export default Profile;
