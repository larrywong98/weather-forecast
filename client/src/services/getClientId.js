import sendRequest from '@/utils/sendRequest';

const getClientId = async () => {
  const response = await sendRequest({
    url: 'http://127.0.0.1:4000/clientId',
    method: 'GET'
  });
  return response;
};
export default getClientId;
