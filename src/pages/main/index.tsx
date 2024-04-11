import Layout from '@/components/layout';
import Weather from '@/lib/weather/weather';
import TravelCardList from '@/pages/main/TravelCardList';

function MainPage() {
  return (
    <Layout>
      <div className='flex justify-between items-center p-4'>
        <img
          src='https://source.unsplash.com/random/1600x900'
          alt='Sight'
          className='w-3/5'
          loading='lazy'
        />
        <Weather />
      </div>
      <TravelCardList />
    </Layout>
  );
}
export default MainPage;
