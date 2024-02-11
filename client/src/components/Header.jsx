import '@/css/header.css';
import logo from '@/assets/logo.png';
import { useEffect, useState, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import { precedingZero } from '@/utils/utils';
import { FcGoogle } from 'react-icons/fc';
import getClientId from '@/services/getClientId';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
  // const url = useLocation();

  const showDateTime = useCallback((firstrun = true) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setCurrentTime(
      `${year}-${precedingZero(month + 1)}-${precedingZero(day)} ${precedingZero(hour)}:${precedingZero(minute)} 
        ${timeZone}`
    );
    if (firstrun === true) {
      setTimeout(() => showDateTime(false), (60 - second + 0.5) * 1000);
      return;
    }
    setTimeout(() => showDateTime(false), 60000);
  }, []);
  useEffect(() => {
    showDateTime();
    // console.log(url);
    // if (url.hash !== '') {
    //   setLoggedin(true);
    // }
  }, [showDateTime]);

  const login = async () => {
    const data = await getClientId();

    const params = {
      client_id: data.clientId,
      redirect_uri: 'http://localhost:5173',
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      include_granted_scopes: 'true',
      state: 'pass-through%20value'
    };

    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=' +
      params.response_type +
      '&client_id=' +
      params.client_id +
      '&redirect_uri=' +
      params.redirect_uri +
      '&scope=' +
      params.scope +
      '&include_granted_scopes=' +
      params.include_granted_scopes +
      '&state=' +
      params.state;
    // Redirect to google authorization server
    window.location.href = url;
    // console.log(url);
  };

  // useGoogleLogin({
  //   onSuccess: codeResponse => {
  //     console.log(codeResponse);

  //     setLoggedin(true);
  //   },
  //   flow: 'auth-code'
  // });

  const logout = () => {
    setLoggedin(false);
  };

  const [loggedin, setLoggedin] = useState(false);

  return (
    <div className="header">
      <div className="logo-wrap">
        <img className="logo" src={logo} alt="" />
        <div className="logo-text">
          <p>Precise</p>
          <span>Weather Forecast</span>
        </div>
      </div>
      <div>{currentTime}</div>

      <div className="flex gap-3">
        {loggedin === false ? (
          // <div className="g-signin2" data-onsuccess={onSignIn}></div>
          <button
            className="flex items-center gap-2 text-grey-700"
            onClick={() => login()}
          >
            Sign in with Google <FcGoogle />
          </button>
        ) : (
          <button
            className="text-grey-700"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}

        <div className="github">
          <a href="https://github.com/larrywong98/weather-forecast">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Header;
