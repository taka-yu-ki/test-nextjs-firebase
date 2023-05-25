import { onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase/client";

type ContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

// ログイン情報を送る荷物
const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  isLoading: true,
});

// 配送エリアを指定するコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // この状態が変わるごとに再配送される
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffectの第２引数を空にすることでAuthProviderが呼ばれたら、最初の１回目だけ走る
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// children限定で配達依頼をするコンポーネント
export const useAuth = () => useContext(AuthContext);
