// import { useState } from 'react';
// import Hello from '@/components/Hello';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from '@/pages/Main';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
const queryClient = new QueryClient();
const clientId =
  '356745219459-1vcfk15vc38ck2bnfrpc8f1pj73gs9i0.apps.googleusercontent.com';
const App = () => {
  // const [count, setCount] = useState(0);

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
