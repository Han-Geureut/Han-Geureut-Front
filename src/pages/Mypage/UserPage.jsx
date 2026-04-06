import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Profile from '../../assets/images/Rectangle.png';
import { useEffect, useState } from 'react';
import MyTravelog from './MyTravelog';
import MyReview from './MyReview';
import { useParams } from 'react-router-dom';

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
  background: ${(props) => (props.isFollowing ? '#e1e1e1' : '#5e81ff')};
  color: ${(props) => (props.isFollowing ? '#000' : '#fff')};
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
  cursor: pointer;
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

const Userpage = () => {
  const { id: userId } = useParams();
  const [profile, setProfile] = useState({});
  const [canFollow, setCanFollow] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `https://api.hangrt.site/api/user/profile/${userId}`,
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
        setCanFollow(data.result.can_follow); // Follow 상태를 초기화
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [userId]); // userId를 의존성 배열로 추가

  const handleFollow = async () => {
    const authToken = localStorage.getItem('authToken');
    const method = canFollow ? 'POST' : 'DELETE';

    try {
      const response = await fetch(
        `https://api.hangrt.site/api/user/follow/${userId}`,
        {
          method,
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
      console.log(`${canFollow ? 'Follow' : 'Unfollow'} successful:`, data);
      setCanFollow(!canFollow); // Follow/Unfollow 성공 시 상태 업데이트

      // 팔로워 수를 즉시 업데이트
      setProfile((prevProfile) => ({
        ...prevProfile,
        follower_count: canFollow
          ? prevProfile.follower_count + 1
          : prevProfile.follower_count - 1,
      }));
    } catch (error) {
      console.error(
        `Failed to ${canFollow ? 'follow' : 'unfollow'} user:`,
        error
      );
    }
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
              </ColumnContainer>
              <FollowButton onClick={handleFollow} isFollowing={!canFollow}>
                {canFollow ? '팔로우' : '팔로잉'}
              </FollowButton>
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

export default Userpage;
