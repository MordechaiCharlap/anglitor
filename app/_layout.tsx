import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </AuthProvider>
  );
}
