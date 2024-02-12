import { QueryClient, QueryClientProvider } from 'react-query';
import Main from '@/pages/Main';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from '@/pages/Auth';
import { useState, useEffect } from 'react';
import getClientId from '@/services/getClientId';
const queryClient = new QueryClient();
const App = () => {
  const [clientId, setClientId] = useState('');
  useEffect(() => {
    (async () => {
      setClientId(await getClientId().clientId);
    })();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="w-screen">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
