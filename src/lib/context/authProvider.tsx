import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useRouter } from "next/router";
import { getToken, setAccessTokenCookie } from "../config/settingToken";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const handleRouteMove = useCallback(() => {
    if( getToken("accessToken") ) {
      if (!isLoggedIn) { 
        setIsLoggedIn(true);
      }
    }
    else
    {
      const refreshToken = getToken("refreshToken");

      if(refreshToken) {
        (async() => {
          const { data } = await axiosInstance.post('/auth/refresh-token', { refreshToken });
          const newAccessToken = data.accessToken;        
          setAccessTokenCookie(newAccessToken);
          setIsLoggedIn(true);
        })();
      }
      else {
        setIsLoggedIn(false);
      }
    }
  }, [])

  useEffect(() => {
    router.events.on("routeChangeComplete",handleRouteMove);
    handleRouteMove();

    return () => {
      router.events.off("routeChangeComplete", handleRouteMove);
    };
  },[router, handleRouteMove]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용해야 합니다.");
  }
  return context;
}