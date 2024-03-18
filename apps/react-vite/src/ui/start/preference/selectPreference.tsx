import { useDispatch } from 'react-redux';
import { setPreferenceType } from '@/store/preferenceTypes';
import { preferenceList } from '@/lib/info/preferenceList';

export const SelectPreference = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (preferenceName) => {
    dispatch(setPreferenceType(preferenceName));
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      {preferenceList.map((preference) => (
        <div
          key={preference.id}
          className='relative rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg'
          onClick={() => handleButtonClick(preference.name)}
        >
          <img className='object-cover w-full h-40' src={preference.image} alt={preference.name} />
          <div className='px-6 py-4'>
            <div className='text-xl font-semibold text-gray-800'>{preference.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
