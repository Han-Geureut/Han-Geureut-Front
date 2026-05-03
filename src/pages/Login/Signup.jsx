import Header from '../../components/Header/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  /* background-color: yellow; */
  margin-top: 4vw;
  height: 50vw;
  align-items: center;
`;

const SignupText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 3vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 5.65vw;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7.25vw;
  align-items: center;
  margin-bottom: 4vw;
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

const IdField = styled.input`
  width: 33.6vw;
  height: 2.4vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  border: 0.1vw solid #e1e1e1;
  background: #f7f7f7;
  padding-right: 6vw;
  padding-left: 1vw;
`;

const CheckButton = styled.button`
  position: absolute;
  right: 0.2vw;
  top: 0.2vw;
  width: 7vw;
  height: 2vw;
  border-radius: 0.2vw;
  border: none;
  border-radius: 4px;
  background: #ff6b00;
  color: white; // 버튼 글자색
  cursor: pointer;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
`;

const AllFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IdFieldContainer = styled.div`
  position: relative;
  width: 33.6vw;
  height: 2.4vw;
`;

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
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
`;

const Signup = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/signup`,
        {
          loginId,
          password,
          userName,
          phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      alert('회원가입 성공!');
      navigate('/Login');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <SignupContainer>
          <SignupText>Sign Up</SignupText>
          <form onSubmit={handleSignup}>
            <AllFieldContainer>
              <FieldContainer>
                <Text>아이디</Text>
                <IdFieldContainer>
                  <IdField
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                  />
                  <CheckButton type="button">중복확인</CheckButton>
                </IdFieldContainer>
              </FieldContainer>
              <FieldContainer>
                <Text>비밀번호</Text>
                <IdField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FieldContainer>
              <FieldContainer>
                <Text>비밀번호 확인</Text>
                <IdField
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FieldContainer>
              <FieldContainer>
                <Text>닉네임</Text>
                <IdFieldContainer>
                  <IdField
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <CheckButton type="button">중복확인</CheckButton>
                </IdFieldContainer>
              </FieldContainer>
              {/* <FieldContainer>
                <Text>휴대폰 인증</Text>
                <FlexColumnContainer>
                  <IdFieldContainer>
                    <IdField
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <CheckButton>인증번호 요청</CheckButton>
                  </IdFieldContainer>
                  <IdFieldContainer>
                    <IdField />
                    <CheckButton>인증하기</CheckButton>
                  </IdFieldContainer>
                </FlexColumnContainer>
              </FieldContainer> */}
            </AllFieldContainer>
            <ButtonContainer>
              <CancelButton
                type="button"
                onClick={() => console.log('Cancelled')}
              >
                취소하기
              </CancelButton>
              <SubmitButton type="submit">가입하기</SubmitButton>
            </ButtonContainer>
          </form>
        </SignupContainer>
      </Container>
    </>
  );
};

export default Signup;
