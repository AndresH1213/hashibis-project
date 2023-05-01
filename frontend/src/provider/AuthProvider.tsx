import { createContext, useState, useEffect } from 'react';
import { IAuthContext } from '../interfaces';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext<IAuthContext>({
  auth: { isInit: false },
  setAuth: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
  authService: AuthService;
}

export const AuthProvider = ({ children, authService }: AuthProviderProps) => {
  const [auth, setAuth] = useState<any>({});

  useEffect(() => {
    async function guard() {
      try {
        const user = await authService.getCurrentUser();
        const token = user.getSignInUserSession()?.getAccessToken().getJwtToken();

        const isInit = true;
        setAuth({ isInit, user, token });
      } catch (error) {
        setAuth({ isInit: false, user: undefined, token: '' });
      }
    }
    guard();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
