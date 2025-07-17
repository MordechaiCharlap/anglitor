import Button from "@/components/Button";
import { ScrollView, Text } from "react-native";

export default function Home() {
  const lessons = Array.from({ length: 20 }, (_, i) => `Lesson ${i + 1}`);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {lessons.map((title, index) => (
        <Button
          circle
          style={{ backgroundColor: "gray", margin: 10 }}
          key={index}
          onPress={() => alert(`${title} pressed!`)}
        >
          <Text>{title}</Text>
        </Button>
      ))}
    </ScrollView>
  );
}
