import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Auth from './components/auth/Auth'
import Dashboard from './components/dash/Dashboard';
import {AuthProvider} from './components/services/auth-service';
import {AuthContext} from './components/services/auth-service';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/login" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
      </Routes>
    </AuthProvider>
  );
}


function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  console.log(auth.uid)
  if (auth.uid == 0) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

