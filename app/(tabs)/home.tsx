import Button from "@/components/CustomButton";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const lessons = Array.from({ length: 20 }, (_, i) => `Lesson ${i + 1}`);
  const { user, setUser } = useUser();
  // useEffect(() => {
  //   setUser();
  // }, []);
  if (user) {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {lessons.map((title, index) => (
          <Button
            circle
            style={{
              backgroundColor: user.level < index - 1 ? "gray" : "blue",
              margin: 10,
            }}
            key={index}
            onPress={() => {
              if (user.level >= index - 1) router.push("/lesson");
            }}
          >
            <Text
              style={{
                color: user.level >= index - 1 ? "white" : "blue",
                margin: 10,
                fontWeight: 500,
              }}
            >
              {title}
            </Text>
          </Button>
        ))}
      </ScrollView>
    );
  } else
    return (
      <View>
        <Text>אתה צריך להתחבר בשביל ללמוד</Text>
      </View>
    );
}
