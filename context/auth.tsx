import {
  User as FirebaseUser,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "../types/user";

type ContextType = {
  fbUser: FirebaseUser | null | undefined;
  isLoading: boolean;
  user: User | null | undefined;
};

// ログイン情報を送る荷物
const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

// 配送エリアを指定するコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // この状態が変わるごとに再配送される
  const [user, setUser] = useState<User | null>();
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  // useEffectの第２引数を空にすることでAuthProviderが呼ばれたら、最初の１回目だけ走る
  useEffect(() => {
    // onメソッドでの監視員を外す変数
    let unsubribe: Unsubscribe;

    onAuthStateChanged(auth, (resultUser) => {
      unsubribe?.();
      setFbUser(resultUser);
      setIsLoading(true);

      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubribe = onSnapshot(ref, (snap) => {
          // asを使用するのは好ましくないが、説明上asで型を固定している
          setUser(snap.data() as User);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fbUser,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// children限定で配達依頼をするコンポーネント
export const useAuth = () => useContext(AuthContext);
