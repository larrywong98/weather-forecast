import sendRequest from '@/utils/sendRequest';

const getCurrentWeather = async location => {
  if (location === '') location = 'Dallas';
  const response = await sendRequest({
    url: `http://127.0.0.1:4000/weather/current?location=${location}`,
    method: 'GET'
  });
  return response;
};

const getNextWeekWeather = async () => {
  const response = await sendRequest({
    url: 'http://127.0.0.1:4000/weather/nextweek',
    method: 'GET'
  });
  return response;
};

export { getCurrentWeather, getNextWeekWeather };
