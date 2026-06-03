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
  background: #ff6b00;
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

const Profile = () => {
  const [profileImage, setProfileImage] = useState(Default);
  const hiddenFileInput = React.useRef(null);
  const [profile, setProfile] = useState({
    user_name: '',
    user_introduction: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

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
        </ProfileContainer>
      </Container>
    </>
  );
};

export default Profile;
