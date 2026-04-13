import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../useAuth/useAuth';

const HeaderContainer = styled.div`
  width: 100%;
  height: 8vw;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 8px 6px -6px #00000029;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1.45vw;
  width: 70%;
  align-items: center;
  gap: 3.4vw;
`;

const StyledNavLink = styled(NavLink)`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    opacity: 0.8;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 18vw;
  height: 2vw;
  border-radius: 0.5vw;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.5vw;
  padding: 0 3vw 0 1vw; /* 좌측 패딩을 조정해 텍스트 입력 영역을 확보하세요. */
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.4vw;
  width: 1.4vw;
  height: 1.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logotitle = styled.p`
  font-size: 1.2vw;
  color: #0034ed;
`;

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <>
      <HeaderContainer>
        <NavContainer>
          <HeaderLogo onClick={() => navigate('/')}>
            <img src={Logo} style={{ width: '5.2vw', height: '5.2vw' }} />
            <Logotitle>MEMORAIZE</Logotitle>
          </HeaderLogo>
          <StyledNavLink to="/" exact>
            홈
          </StyledNavLink>
          <StyledNavLink to="/Creates1">앨범생성</StyledNavLink>
          <StyledNavLink to="/Viewreview">리뷰</StyledNavLink>
          <StyledNavLink to="/Mypage">마이페이지</StyledNavLink>
          <SearchBarContainer onClick={() => navigate('/search')}>
            <SearchInput />
            <SearchIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4vw"
                height="1.4vw"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M18.0833 16.3333H17.1617L16.835 16.0183C17.9783 14.6883 18.6667 12.9617 18.6667 11.0833C18.6667 6.895 15.2717 3.5 11.0833 3.5C6.895 3.5 3.5 6.895 3.5 11.0833C3.5 15.2717 6.895 18.6667 11.0833 18.6667C12.9617 18.6667 14.6883 17.9783 16.0183 16.835L16.3333 17.1617V18.0833L22.1667 23.905L23.905 22.1667L18.0833 16.3333ZM11.0833 16.3333C8.17833 16.3333 5.83333 13.9883 5.83333 11.0833C5.83333 8.17833 8.17833 5.83333 11.0833 5.83333C13.9883 5.83333 16.3333 8.17833 16.3333 11.0833C16.3333 13.9883 13.9883 16.3333 11.0833 16.3333Z"
                  fill="black"
                />
              </svg>
            </SearchIcon>
          </SearchBarContainer>
          {isAuthenticated ? (
            <StyledNavLink to="/login" onClick={handleLogout}>
              로그아웃
            </StyledNavLink>
          ) : (
            <StyledNavLink to="/login">로그인</StyledNavLink>
          )}
        </NavContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
