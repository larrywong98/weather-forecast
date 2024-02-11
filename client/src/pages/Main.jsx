import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import '@/css/main.css';
import '@/css/hourlyWidget.css';
import { kelvinToCelsius } from '@/utils/utils';
import { useQuery } from 'react-query';
import { getCurrentWeather } from '@/services/getWeather';
import { useState } from 'react';
import { CiCloudOn, CiTempHigh } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import HourlyWidget from '@/components/HourlyWidget';
import DailyWidget from '@/components/DailyWidget';

const Main = () => {
  // const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');
  const {
    isLoading,
    isError,
    data: weatherData,
    error,
    refetch
  } = useQuery({
    queryKey: ['weatherData', 2],
    queryFn: () => getCurrentWeather(searchText)
  });
  const searchTextOnChange = value => {
    setSearchText(value);
  };

  const refetchOnEnter = () => {
    refetch();
  };

  // const {
  //   isLoading2,
  //   isError2,
  //   data: originalNextWeekWeatherData,
  //   error2
  // } = useQuery({
  //   queryKey: ['nextWeekWeatherData', 2],
  //   queryFn: getNextWeekWeather
  // });

  // const nextWeekWeatherData = useMemo(() => {
  //   return originalNextWeekWeatherData;
  // }, [originalNextWeekWeatherData]);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const airConditions = [
    { id: 1, name: 'feels_like', desp: 'Real Feel', icon: <CiTempHigh /> },
    { id: 2, name: 'wind_speed', desp: 'Wind', icon: <FaWind /> },
    { id: 3, name: 'clouds', desp: 'Clouds', icon: <CiCloudOn /> },
    { id: 4, name: 'humidity', desp: 'Humidity', icon: <WiHumidity /> }
  ];

  // useEffect(() => {
  //   console.log(weatherData);
  // }, [weatherData]);
  if (isLoading) {
    return <>Loading...</>;
  }
  // if (isLoading2) {
  //   return <>Loading...</>;
  // }
  if (isError || error) {
    return <>Error</>;
  }
  // if (isError2 || error2) {
  //   return <>Error</>;
  // }

  const mapValueToField = (name, value) => {
    switch (name) {
      case 'temp':
        return Math.floor(kelvinToCelsius(value) + 0.5) + ' °C';
      case 'feels_like':
        return kelvinToCelsius(value).toFixed(2) + ' °C';
      case 'wind_speed':
        return value + ' m/s';
      case 'clouds':
        return value + ' %';
      case 'humidity':
        return value + ' %';
      case 'icon':
        return `https://openweathermap.org/img/wn/${value}.png`;
      case 'timestamp': {
        let time = new Date(value * 1000);
        if (time.getMinutes() < 10)
          return time.getHours() + ':0' + time.getMinutes();
        return time.getHours() + ':' + time.getMinutes();
      }
      default:
        return 'Unavailable';
    }
  };

  return (
    <>
      <div className="main-page">
        <div>
          <Header />
        </div>
        <div className="mb-10">
          <SearchBar
            onChange={searchTextOnChange}
            refetchOnEnter={refetchOnEnter}
          />
        </div>

        <div className="main-content">
          <div className="flex flex-col items-center justify-between w-full">
            <div className="flex flex-col items-center w-full gap-5">
              <div className="text-grey-400 size-100 font-bold flex justify-center">
                Current Weather
              </div>
              <div className="flex justify-center items-center gap-14 w-full px-10">
                <div className="w-24">
                  {weatherData.name +
                    (weatherData.state ? ', ' + weatherData.state : '')}
                </div>
                <div className="flex flex-col items-center w-28">
                  <div>
                    {mapValueToField('temp', weatherData.current['temp'])}
                  </div>
                  <div>{weatherData.current.weather[0].description}</div>
                </div>
                <div className="w-24">
                  <img
                    src={mapValueToField(
                      'icon',
                      weatherData.current.weather[0].icon
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="text-grey-400 size-100 font-bold flex justify-center">
                Air conditions
              </div>
              <div className="current-item">
                {airConditions.map(widget => (
                  <div key={widget.id} className="current-column">
                    <div className="flex items-center gap-1">
                      {widget.icon}
                      {widget.desp}
                    </div>
                    <span>
                      {mapValueToField(
                        widget.name,
                        weatherData.current[widget.name]
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="text-grey-400 size-100 font-bold flex justify-center">
                Today Forecast
              </div>
              <div className="flex gap-2 ">
                {weatherData.hourly.slice(0, 5).map(hourlyItem => (
                  <div className="hourly-widget" key={hourlyItem.dt}>
                    <HourlyWidget
                      time={mapValueToField('timestamp', hourlyItem.dt)}
                      iconUrl={mapValueToField(
                        'icon',
                        hourlyItem.weather[0].icon
                      )}
                      temp={mapValueToField('temp', hourlyItem.temp)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col  justity-center gap-2 w-full">
            <div className="text-grey-400 size-100 font-bold flex justify-center w-full">
              Weekly Forecast
            </div>
            <div className="flex flex-col w-full items-center">
              {weatherData.daily.map(day => (
                <div key={day.dt} className="flex">
                  <DailyWidget
                    dayName={dayNames[new Date(day.dt * 1000).getDay()]}
                    icon={mapValueToField('icon', day.weather[0].icon)}
                    description={day.weather[0].description}
                    dayTemp={mapValueToField('temp', day.temp.day)}
                    dayClouds={mapValueToField('clouds', day.clouds)}
                    windSpeed={mapValueToField('wind_speed', day.wind_speed)}
                    humidity={mapValueToField('humidity', day.humidity)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
