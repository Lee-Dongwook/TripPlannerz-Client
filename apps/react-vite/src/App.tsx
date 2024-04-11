import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '@/ui/navbar/navbar';
import StartPage from '@/pages/start';
import MainPage from '@/pages/main';
import CreatePage from '@/pages/create';
import SearchPage from '@/pages/search';
import DetailPage from '@/pages/detail';
import ProfilePage from '@/pages/my/profile';
import AccountPage from '@/pages/my/account';
import SchedulePage from '@/pages/my/schedule';
import WithdrawPage from '@/pages/my/withdraw';

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
