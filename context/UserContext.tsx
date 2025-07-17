import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = { name: string; email: string; level: number }; // You can expand this
const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser({ name: "Fasteriko", email: "admin@admin.com", level: 1 });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
