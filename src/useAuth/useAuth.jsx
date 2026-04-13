import { useEffect, useState } from 'react';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // token이 있으면 true, 없으면 false
  }, []);

  return isAuthenticated;
}

export default useAuth;
