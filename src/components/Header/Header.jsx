import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
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
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logotitle = styled.p`
  font-size: 1.2vw;
  color: #000;
`;

/* 검색 텍스트 버튼 */
const SearchText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-weight: 500;
  cursor: pointer;

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
    <>
      <HeaderContainer>
        <NavContainer>
          <HeaderLogo onClick={() => navigate('/')}>
            <img src={Logo} style={{ width: '5.2vw', height: '5.2vw', marginTop: '-0.5vw', }} />
            <Logotitle>Hangeureut</Logotitle>
          </HeaderLogo>

          <StyledNavLink to="/">홈</StyledNavLink> {/* exact 제거 */}
          <StyledNavLink to="/Mypage">마이페이지</StyledNavLink>

          {/* 검색 버튼 */}
          <SearchText onClick={() => navigate('/search')}>
            검색
          </SearchText>

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