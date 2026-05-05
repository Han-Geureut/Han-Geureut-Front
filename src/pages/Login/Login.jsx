import Header from '../../components/Header/Header';
import styled from 'styled-components';
import kakaoLoginBtn from '../../assets/images/kakao_login_btn.png';
import googleLoginBtn from '../../assets/images/google_login_btn.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 4vw;
  height: 40vw;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.9vw;
  gap: 1.5vw;
  margin-bottom: 1vw;
`;

const InputField = styled.input`
  width: 40vw;
  height: 3.2vw;
  border-radius: 5px;
  border: 1px solid var(--Gray-Gray-300, #d1d1d1);
  padding-left: 0.8vw;
  font-size: 1vw;

  ::placeholder {
    color: var(--6, #414141);
    font-family: Pretendard;
    font-size: 1vw;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const LoginText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const FindText = styled.p`
  color: var(--6, #414141);
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginBtn = styled.button`
  margin-top: 2vw;
  width: 40vw;
  height: 3vw;
  flex-shrink: 0;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 0.5vw;
  background: var(--MAIN, #ff6b00);
  margin-bottom: 0.8vw;
`;

const JoinBtn = styled.button`
  width: 40vw;
  height: 3vw;
  flex-shrink: 0;
  border-radius: 0.5vw;
  border: 1px solid var(--MAIN, #ff6b00);
  color: #000;
  font-family: Pretendard;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Simplecontainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2vw;
`;

const SimpleStroke = styled.div`
  width: 16vw;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 1px;
  stroke: var(--2, #902a2a);
`;

const SimpleText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  margin-top: 1.2vw;
  align-items: center;
`;

const SocialLoginBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/Signup');
  };

  const handleLogin = async () => {
    const requestBody = { loginId, password };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`Login failed with status: ${response.status}`);

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json'))
        throw new Error('Invalid content type received from server');

      const data = await response.json();
      console.log('Login successful:', data);

      const authToken = response.headers.get('authorization');
      const refreshToken = response.headers.get('authorization-refresh');
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', data.result.user_id);

      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <Header />
      <Container>
        <LoginContainer>
          <LoginText>Login</LoginText>
          <InputContainer>
            <InputField
              placeholder="아이디를 입력해주세요"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <InputField
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <FindText>아이디 찾기 | 비밀번호 찾기</FindText>
          <LoginBtn onClick={handleLogin}>로그인하기</LoginBtn>
          <JoinBtn onClick={handleSignup}>회원가입하기</JoinBtn>
          <Simplecontainer>
            <SimpleStroke />
            <SimpleText>간편 로그인</SimpleText>
            <SimpleStroke />
          </Simplecontainer>
          <SocialContainer>
            <SocialLoginBtn onClick={handleKakaoLogin}>
              <img src={kakaoLoginBtn} style={{ width: '13vw', height: 'auto' }} />
            </SocialLoginBtn>
            <SocialLoginBtn onClick={handleGoogleLogin}>
              <img src={googleLoginBtn} style={{ width: '13vw', height: 'auto' }} />
            </SocialLoginBtn>
          </SocialContainer>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;
