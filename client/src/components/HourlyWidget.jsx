const HourlyWidget = props => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs">{props.time}</div>
      <img className="w-10" src={props.iconUrl} />
      <div className="text-xs font-bold">{props.temp}</div>
    </div>
  );
};
export default HourlyWidget;
