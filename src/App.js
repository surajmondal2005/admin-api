import React, { useState, useEffect } from 'react';
import UserManagement from './components/UserManagement';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for a token in localStorage when the app loads
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log("Current token stored in App.js:", token);
  }, [token]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('jwt_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
  };

  return (
    <div className="App">
      {token ? (
        <UserManagement token={token} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App; 