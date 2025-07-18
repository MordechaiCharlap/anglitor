import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const { loading } = useAuth();
  if (loading) return <View style={{ flex: 1 }}></View>;
  if (!user)
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <View style={{ rowGap: 5, alignItems: "center" }}>
          <Text style={{ fontSize: 60, fontWeight: 500 }}>אנגליטור</Text>
          <Text style={{ fontSize: 24, fontWeight: 300 }}>
            אפליקציה ללימוד אנגלית
          </Text>
          <View>
            <CustomButton>
              <Text>כניסה</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    );
  else return <Redirect href={"/(tabs)/home"} />;
}
