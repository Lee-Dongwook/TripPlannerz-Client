import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = lazy(() => import('@/components/layout/navbar/navbar'));
const StartPage = lazy(() => import('@/pages/start'));
const MainPage = lazy(() => import('@/pages/main'));
const CreatePage = lazy(() => import('@/pages/create'));
const SearchPage = lazy(() => import('@/pages/search'));
const DetailPage = lazy(() => import('@/pages/detail'));
const ProfilePage = lazy(() => import('@/pages/my/profile'));
const AccountPage = lazy(() => import('@/pages/my/account'));
const SchedulePage = lazy(() => import('@/pages/my/schedule'));
const WithdrawPage = lazy(() => import('@/pages/my/withdraw'));

function App() {
  const token: string | null = useSelector((state: any) => {
    console.log(state.token.token);
    return state.token.token;
  });

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {token && <Navbar />}
        <Routes>
          <Route path='/' element={<StartPage />} />
          {token && (
            <>
              <Route path='/main' element={<MainPage />} />
              <Route path='/create' element={<CreatePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/search/:postId' element={<DetailPage />} />
              <Route path='/my/profile' element={<ProfilePage />} />
              <Route path='/my/account' element={<AccountPage />} />
              <Route path='/my/schedule' element={<SchedulePage />} />
              <Route path='/my/withdraw' element={<WithdrawPage />} />
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
