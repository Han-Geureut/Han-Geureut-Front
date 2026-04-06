/* eslint-disable */
import logo from './logo.svg';
import GlobalStyle from './styles/globalStyle';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Login/Signup';
import Profile from './pages/Login/Profile';
import Creates1 from './pages/Album/Creates1';
import Creates2 from './pages/Album/Creates2';
import Creates3 from './pages/Album/Creates3';
import Creates4 from './pages/Album/Creates4';
import Viewreview from './pages/Review/Viewreview';
import Writereview from './pages/Review/Writereview';
import Home from './pages/Home/Home';
import Mypage from './pages/Mypage/Mypage';
import Search from './pages/Search/Search';
import Detailreview from './pages/Review/Detailreview';
import Created from './pages/Album/Created';
import { AlbumProvider } from './AlbumContext/AlbumContext';
import Template from './pages/Template/Template';
import WholeTravelog from './components/Travelog/WholeTravelog';
import TemplateDetail from './pages/Template/TemplateDetail';
import UserTravelog from './components/Travelog/UserTravelog';
import Userpage from './pages/Mypage/UserPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AlbumProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Creates1" element={<Creates1 />} />
            <Route path="/Creates2" element={<Creates2 />} />
            <Route path="/Creates3" element={<Creates3 />} />
            <Route path="/Creates4" element={<Creates4 />} />
            <Route path="/Viewreview" element={<Viewreview />} />
            <Route path="/Writereview/:id" element={<Writereview />} />
            <Route path="/Userpage/:id" element={<Userpage />} />
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Detailreview/:id" element={<Detailreview />} />
            <Route path="/created/:id" element={<Created />} />
            <Route path="/Template/:albumId" element={<Template />} />
            <Route path="/WholeTravelog" element={<WholeTravelog />} />
            <Route path="/UserTravelog/:id" element={<UserTravelog />} />
            <Route
              path="/template-detail/:photoId"
              element={<TemplateDetail />}
            />
          </Routes>
        </AlbumProvider>
      </Router>
    </>
  );
}

export default App;
