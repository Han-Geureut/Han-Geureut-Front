import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../useAuth/useAuth';

const HeaderContainer = styled.header`
  width: 100%;
  height: 9vw;
  min-height: 64px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background: #ffffff;
  box-sizing: border-box;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.45vw;
  min-height: 28px;
  width: 70%;
  gap: 3.4vw;
`;

const StyledNavLink = styled(NavLink)`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`;

const HeaderLogo = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 7vw;
  height: 7vw;
  min-width: 52px;
  min-height: 52px;
  margin-top: -0.5vw;
  object-fit: contain;
`;

const SearchText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
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
    <HeaderContainer>
      <NavContainer>
        <HeaderLogo type="button" onClick={() => navigate('/')}>
          <LogoImg src={Logo} alt="" />
        </HeaderLogo>

        <StyledNavLink to="/">홈</StyledNavLink>
        <StyledNavLink to="/Mypage">마이페이지</StyledNavLink>
        <SearchText onClick={() => navigate('/search')}>검색</SearchText>
        {isAuthenticated ? (
          <StyledNavLink to="/login" onClick={handleLogout}>
            로그아웃
          </StyledNavLink>
        ) : (
          <StyledNavLink to="/login">로그인</StyledNavLink>
        )}
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
