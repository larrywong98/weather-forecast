import { CiCloudOn, CiTempHigh } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';

const DailyWidget = props => {
  return (
    <div className="weekly-item">
      <div className="weekly-column">
        <div className="weekly-column-item">{props.dayName}</div>
        <div className="weekly-column-item">
          <img className="w-8 " src={props.icon} />
          <div>{props.description}</div>
        </div>
      </div>
      <div className="weekly-column">
        <div className="weekly-column-item">
          <CiTempHigh />
          {props.dayTemp}
        </div>
        <div className="weekly-column-item">
          <CiCloudOn />
          {props.dayClouds}
        </div>
      </div>
      <div className="weekly-column">
        <div className="weekly-column-item">
          <FaWind />
          {props.windSpeed}
        </div>
        <div className="weekly-column-item">
          <WiHumidity />
          {props.humidity}
        </div>
      </div>
    </div>
  );
};

export default DailyWidget;
