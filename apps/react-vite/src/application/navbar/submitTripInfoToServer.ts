import { postTripInfo } from '@/services/postTripInfo';

export const SubmitTripInfoToServer = async (token, image, contentsData) => {
  const formData = new FormData();

  formData.append('image', image[0].originFileObj);
  formData.append(
    'contentsData',
    new Blob([JSON.stringify(contentsData)], { type: 'application/json' })
  );

  const response = await postTripInfo(token, formData);
  return response;
};
