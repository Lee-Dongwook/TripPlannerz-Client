import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '@/ui/navbar/navbar';
import StartPage from '@/ui/start/start';
import MainPage from '@/ui/main/main';
import CreatePage from '@/ui/create/create';
import SearchPage from '@/ui/search/search';
import DetailPage from '@/ui/detail/detail';
import ProfilePage from '@/ui/my/profile/profile';
import AccountPage from '@/ui/my/account/account';
import SchedulePage from '@/ui/my/schedule/schedule';
import WithdrawPage from '@/ui/my/withdraw/withdraw';

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
