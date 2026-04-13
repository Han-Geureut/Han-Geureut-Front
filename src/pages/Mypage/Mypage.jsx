import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Profile from '../../assets/images/Rectangle.png';
import { useEffect, useState } from 'react';
import MyTravelog from './MyTravelog';
import MyReview from './MyReview';
import { useNavigate } from 'react-router-dom';

const MypageContainer = styled.div`
  width: 100%;
  height: 22vw;
  background-color: #f5f5f5;
  justify-content: center;
  display: flex;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-top: 5vw;
  padding-bottom: 5vw;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const UserName = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const FollowButton = styled.button`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 4.1vw;
  height: 2vw;
  border-radius: 4px;
  background: var(--2, #5e81ff);
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
`;

const EditProfileButton = styled.button`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 6vw;
  height: 2vw;
  border-radius: 4px;
  background: #5e81ff;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
  margin-top: 1vw;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileP = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 0.6vw;
`;

const ProfileIntro = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TravelContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const Travelo = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ProfileImage = styled.div`
  width: 12vw;
  height: 12vw;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  background-image: url(${(props) => props.image || Profile});
  position: relative;
`;

const Mypage = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const userId = 'test';

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/profile`,
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
        setProfile(data.result);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []); // 빈 배열을 의존성 배열로 추가

  const handleEditProfile = () => {
    navigate('/Profile');
  };

  return (
    <>
      <Header />

      <MypageContainer>
        <CreatesContainer>
          <RowContainer>
            <ProfileImage image={profile.image_url} />
            <RowContainer
              style={{
                marginTop: '1.25vw',
                marginLeft: '2.4vw',
                justifyContent: 'space-between',
              }}
            >
              <ColumnContainer>
                <UserName>{profile.user_name}</UserName>
                <RowContainer style={{ marginTop: '1.45vw' }}>
                  <ProfileP>앨범 수</ProfileP>
                  <ProfileP style={{ marginRight: '2vw' }}>
                    {profile.album_count}
                  </ProfileP>
                  <ProfileP>팔로워</ProfileP>
                  <ProfileP style={{ marginRight: '2vw' }}>
                    {profile.follower_count}
                  </ProfileP>
                  <ProfileP>팔로잉</ProfileP>
                  <ProfileP style={{ marginRight: '2vw' }}>
                    {profile.following_count}
                  </ProfileP>
                </RowContainer>
                <RowContainer style={{ marginTop: '1vw' }}>
                  <ProfileIntro>{profile.user_introduction}</ProfileIntro>
                </RowContainer>
                <EditProfileButton onClick={handleEditProfile}>
                  프로필 수정하기
                </EditProfileButton>
              </ColumnContainer>
              {/* <FollowButton>팔로우</FollowButton> */}
            </RowContainer>
          </RowContainer>
        </CreatesContainer>
      </MypageContainer>

      <Container>
        <MyTravelog title="My Album" myalbum={profile.albums} />

        <CreatesContainer style={{ paddingTop: '0vw' }}>
          <TravelContainer>
            <Travelo>My Reviews</Travelo>
          </TravelContainer>
          <MyReview />
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Mypage;
