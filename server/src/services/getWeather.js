import sendRequest from "../utls/sendRequest.js";

const getCurrentWeather = async ({ ...location }) => {
  let data = await sendRequest({
    url: `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${process.env.appid}`,
  });
  return data;
};

const getNextWeekWeather = async ({ ...location }) => {
  let data = await sendRequest({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.appid}`,
  });
  return data;
};

export { getCurrentWeather, getNextWeekWeather };
