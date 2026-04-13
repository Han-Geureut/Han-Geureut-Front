import styled from 'styled-components';
import FriendsImage from '../../assets/images/friendsimage.png';
import Share from '../../assets/images/share.png';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Memoraize = styled.p`
  color: var(--2, #5e81ff);
  font-family: Pretendard;
  font-size: 10vw;
  font-style: normal;
  font-weight: 600;
  position: absolute;
  left: -7%;
  line-height: normal;
  transform: rotate(90deg);
  transform-origin: left bottom; /* 회전의 기준점 변경 */
  opacity: 0.8;
  top: 225%;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 89vw;
  align-items: center;
`;

const FriendsContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 3vw;
  margin-bottom: 3.7vw;
`;

const FriendsP = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: ${(props) => (props.isLast ? '0' : '7.4vw')};
`;

const AlbumDetail = styled.div`
  width: 100%;
  height: 20vw;
  background-color: #f5f5f5;
  padding: 0.9vw 1vw 0 2.15vw;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FriendsTitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CreateDate = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 0.3vw;
`;

const HashTag = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  margin-top: 1.2vw;
`;

const AlbumData = [
  { id: 1, title: '앨범제목 1', date: '생성일 1', hashtag: '#해시태그1' },
  { id: 2, title: '앨범제목 2', date: '생성일 2', hashtag: '#해시태그2' },
  { id: 3, title: '앨범제목 3', date: '생성일 3', hashtag: '#해시태그3' },
];

const FriendAlbum = () => {
  return (
    <>
      <TextContainer>
        <Memoraize>MEMORAIZE</Memoraize>
      </TextContainer>

      <CreatesContainer>
        <FriendsContainer>
          <FriendsP>Friends Album</FriendsP>
        </FriendsContainer>
        {AlbumData.map((album) => (
          <StyledLink to={`/created/${album.id}`} key={album.id}>
            <AlbumContainer>
              <img
                src={FriendsImage}
                style={{ width: '40vw', height: '20vw' }}
                alt="Album"
              />
              <AlbumDetail>
                <RowContainer>
                  <FriendsTitle>{album.title}</FriendsTitle>
                  <img
                    src={Share}
                    style={{ width: '0.8vw', height: '0.9vw' }}
                    alt="Share Icon"
                  />
                </RowContainer>
                <CreateDate>{album.date}</CreateDate>
                <HashTag>{album.hashtag}</HashTag>
              </AlbumDetail>
            </AlbumContainer>
          </StyledLink>
        ))}
      </CreatesContainer>
    </>
  );
};

export default FriendAlbum;
