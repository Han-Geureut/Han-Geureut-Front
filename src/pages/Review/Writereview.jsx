import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Banner from '../../assets/images/Writereviewbanner.png';
import Star from '../../assets/images/Vector (2).png';
import { useState, useRef } from 'react';
import css from 'styled-components';
import Image from '../../assets/images/imageplus.png';
import FillStar from '../../assets/images/Vector (1).png';
import { useNavigate, useParams } from 'react-router-dom';

const BannerContainer = styled.div`
  width: 100%;
  height: 27vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 58%;
  margin-top: 7.65vw;
  margin-bottom: 7.5vw;
  height: auto; /* Height is now auto to adjust as per content */
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8.05vw;
  width: 100%;
  align-items: center;
`;

const ContentP = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Contenttitle = styled.p`
  margin-bottom: 1.7vw;
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Titlefield = styled.input`
  width: 100%;
  height: 3.2vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  border: 1px solid #e1e1e1;
  background: #f7f7f7;
  padding-left: 0.6vw;
`;

const RequireText = styled.p`
  text-align: left;
  margin-top: 1vw;
  color: var(--5, #707070);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ReviewContentContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const ReviewP = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BlankBox = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: auto; /* Height is now auto to adjust as per content */
  fill: var(--black-white-white-1000, #fff);
  stroke-width: 0.1vw;
  stroke: var(--Gray-Gray-50, #fafafa);
`;

const ToolBox = styled.div`
  height: 3.65vw;
  background: var(--Gray-Gray-100, #f7f7f7);
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 1vw;
`;

const Imageplus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1vw;
  margin-left: 0.75vw;
`;

const ImageP = styled.p`
  color: var(--Gray-Gray-700, #464a4d);

  /* Body/Body_small/medium */
  font-family: Pretendard;
  font-size: 0.6vw;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.018vw;
`;
const BoldText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: Roboto;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5vw; /* 166.667% */
`;

const ItalicText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
`;

const UnderlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;

const MidlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: strikethrough;
`;

const InputContent = styled.div`
  width: 100%;
  height: auto; /* Adjust height dynamically */
  flex-shrink: 0;
  min-height: 20vw;
  flex-grow: 1;
  color: var(--Gray-Gray-500, #9e9e9e);
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2vw;
  padding: 1.5vw; /* 내부 패딩 추가 */
  border: 0.1vw solid #e1e1e1;
  outline: none; /* 포커스 시 아웃라인 제거 */
  border-top: none;
  overflow: auto; /* Enable scrolling if content overflows */

  ${({ isBold }) =>
    isBold &&
    css`
      font-weight: bold;
    `}
  ${({ isItalic }) =>
    isItalic &&
    css`
      font-style: italic;
    `}
  ${({ isUnderline }) =>
    isUnderline &&
    css`
      text-decoration: underline;
    `}
  ${({ isStrikethrough }) =>
    isStrikethrough &&
    css`
      text-decoration: line-through;
    `}
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
  margin-top: 4.5vw;
`;

const Writereview = () => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const navigate = useNavigate();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [star, setStar] = useState(0);

  const { id: placeId } = useParams();

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleUnderline = () => setIsUnderline(!isUnderline);
  const toggleStrikethrough = () => setIsStrikethrough(!isStrikethrough);

  const fileInputRef = useRef(null);

  const contentEditableRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInput = () => {
    // Update the context state with the text content of the contentEditable div
    setContext(contentEditableRef.current.textContent);
  };

  const handleFocus = () => {
    if (contentEditableRef.current.textContent === '내용을 입력하세요.') {
      contentEditableRef.current.textContent = '';
      contentEditableRef.current.style.color = 'black';
    }
  };

  const handleBlur = () => {
    if (!contentEditableRef.current.textContent.trim()) {
      contentEditableRef.current.textContent = '내용을 입력하세요.';
      contentEditableRef.current.style.color = '#ccc'; // Light grey color for placeholder text
    }
  };

  const handleStarClick = (index) => {
    if (index + 1 === star) {
      setStar(index);
    } else {
      setStar(index + 1);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + imageFiles.length > 3) {
      alert('You can only upload a maximum of 3 images');
      return;
    }

    const validFiles = files.filter(
      (file) => file.type.substr(0, 5) === 'image'
    );

    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);

    validFiles.forEach((file) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = '50%';
      img.style.display = 'block';
      img.style.marginBottom = '1vw'; // Add margin to avoid images sticking together
      contentEditableRef.current.appendChild(img);
    });
  };

  const submitReview = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('context', context);
    formData.append('placeId', placeId.toString());
    formData.append('star', star.toString());

    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    console.log(imageFiles);
    console.log(title);
    console.log(context);
    console.log(placeId);
    console.log(star);
    console.log('Submitting review for placeId:', placeId);

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`https://api.hangrt.site/api/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Review submission response:', data);
      navigate('/Viewreview');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <>
      <Header />
      <BannerContainer>
        <img src={Banner} style={{ width: '100%', height: '27vw' }} />
      </BannerContainer>

      <Container>
        <CreatesContainer>
          <ContentContainer style={{ marginBottom: '4.2vw' }}>
            <ContentP>Rating</ContentP>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < star ? FillStar : Star}
                style={{ width: '1.8vw', height: '1.8vw' }}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </ContentContainer>

          <ContentContainer style={{ gap: '9.45vw', alignItems: 'center' }}>
            <Contenttitle>Title</Contenttitle>
            <FieldContainer>
              <Titlefield
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
              />
              <RequireText>* 최대 50자 이내</RequireText>
            </FieldContainer>
          </ContentContainer>

          <ReviewContentContainer>
            <ReviewP>Content</ReviewP>
          </ReviewContentContainer>

          <BlankBox>
            <ToolBox>
              <Imageplus onClick={triggerFileInput}>
                <img
                  src={Image}
                  alt="사진 추가"
                  style={{ width: '1.2vw', height: '1.2vw' }}
                />
              </Imageplus>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
              />
              <BoldText onClick={toggleBold}>B</BoldText>
              <ItalicText onClick={toggleItalic}>I</ItalicText>
              <UnderlineText onClick={toggleUnderline}>U</UnderlineText>
              <MidlineText onClick={toggleStrikethrough}>T</MidlineText>
            </ToolBox>

            <InputContent
              ref={contentEditableRef}
              contentEditable
              placeholder="내용을 입력하세요."
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isBold={isBold}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              isItalic={isItalic}
              isUnderline={isUnderline}
              isStrikethrough={isStrikethrough}
            />
          </BlankBox>

          <ButtonContainer>
            <CancelButton>취소하기</CancelButton>
            <SubmitButton onClick={submitReview}>리뷰쓰기</SubmitButton>
          </ButtonContainer>
        </CreatesContainer>
      </Container>
    </>
  );
};

export default Writereview;
