import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
  handleInfoUser: (user: UserProps) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    // Caso o componente desmontar, ele cancela essa verificação se há usuário logado
    return () => {
      unsub();
    };
  }, []);

  function handleInfoUser(user: UserProps) {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loadingAuth, handleInfoUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
