import '@/css/header.css';
import logo from '@/assets/logo.png';
import { useEffect, useState, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import { precedingZero } from '@/utils/utils';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
// import { useLocation } from 'react-router-dom';

// import { useGoogleLogin } from '@react-oauth/google';

// import { gapi } from 'gapi-script';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
  // const url = useLocation();

  // const clientId =
  //   '356745219459-1vcfk15vc38ck2bnfrpc8f1pj73gs9i0.apps.googleusercontent.com';

  // const clientSectet = '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';
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

  const login = () => {
    const params = {
      client_id:
        '356745219459-1vcfk15vc38ck2bnfrpc8f1pj73gs9i0.apps.googleusercontent.com',
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
      <h1>{currentTime}</h1>

      <div className="flex">
        {loggedin === false ? (
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
          <button>
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
