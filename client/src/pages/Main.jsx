import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import '@/css/main.css';
import { kelvinToCelsius } from '@/utils/utils';
import { useQuery } from 'react-query';
import { getCurrentWeather, getNextWeekWeather } from '@/services/getWeather';
import { useMemo } from 'react';
const Main = () => {
  // const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: weatherData,
    error
  } = useQuery({
    queryKey: ['weatherData', 2],
    queryFn: getCurrentWeather
  });

  const {
    isLoading2,
    isError2,
    data: originalNextWeekWeatherData,
    error2
  } = useQuery({
    queryKey: ['nextWeekWeatherData', 2],
    queryFn: getNextWeekWeather
  });

  const nextWeekWeatherData = useMemo(() => {
    // get avg of 7 days
    return originalNextWeekWeatherData;
  }, [originalNextWeekWeatherData]);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  // useEffect(() => {
  //   console.log(nextWeekWeatherData);
  // }, [nextWeekWeatherData]);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (isLoading2) {
    return <>Loading...</>;
  }
  if (isError || error) {
    return <>Error</>;
  }
  if (isError2 || error2) {
    return <>Error</>;
  }

  const mapFieldToValue = (name, value) => {
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
        <div>
          <SearchBar />
        </div>

        <div className="main-content">
          <div className="flex flex-col items-center border-2">
            <div className="flex flex-col items-center">
              <p className="text-grey-400 size-100">Current Weather</p>
              <div className="flex flex-row items-center">
                <div>{weatherData.current.weather.description}</div>
                <div>
                  {'current' in weatherData
                    ? mapFieldToValue('temp', weatherData.current['temp'])
                    : ''}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="">Air conditions</p>
              <div className="flex">
                {[
                  { id: 1, name: 'feels_like', desp: 'Real Feel' },
                  { id: 2, name: 'wind_speed', desp: 'Wind' },
                  { id: 3, name: 'clouds', desp: 'Clouds' },
                  { id: 4, name: 'humidity', desp: 'Humidity' }
                ].map(widget => (
                  <div
                    key={widget.id}
                    className="bg-white/20 mx-2 my-1 px-2 py-1 border-1 rounded-md"
                  >
                    <p>{widget.desp}</p>
                    <span>
                      {'current' in weatherData
                        ? mapFieldToValue(
                            widget.name,
                            weatherData.current[widget.name]
                          )
                        : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="">Today Forecast</p>
              <div className="">33</div>
            </div>
          </div>
          <div className="flex flex-col items-center border-2">
            <p className="">Weekly report</p>
            <div className="">
              {nextWeekWeatherData &&
                nextWeekWeatherData.list.map((day, index) => (
                  <div key={day.dt} className="flex">
                    {index % 8 === 1 ? (
                      <>
                        <div> {dayNames[new Date(day.dt * 1000).getDay()]}</div>
                        <div>{day.main.temp} °C</div>
                        <div>{day.wind.speed} m/s</div>
                        <div>humidity {day.main.humidity} %</div>
                        <div>clouds {day.clouds.all} %</div>
                        <div>
                          <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
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
