import { useNavigate } from 'react-router-dom';
import { NavbarButton } from '@/ui/navbar/button/navbarButton';

export const InnerMenu = () => {
  const navigate = useNavigate();

  const moveToCreate = () => {
    navigate('/create');
  };

  const moveToSearch = () => {
    navigate('/search');
  };

  const moveToBill = () => {
    navigate('/bill');
  };

  return (
    <div className='mt-2 space-y-2'>
      <div>
        <NavbarButton name='여행 생성' onClick={moveToCreate} />
      </div>
      <div>
        <NavbarButton name='일정 조회' onClick={moveToSearch} />
      </div>
      <div>
        <NavbarButton name='여행 경비' onClick={moveToBill} />
      </div>
    </div>
  );
};
