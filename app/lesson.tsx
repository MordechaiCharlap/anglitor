import Button from "@/components/Button";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
const pictures = [
  {
    path: require("../assets/images/words/apple.jpeg"),
    heb: "תפוח",
    eng: "apple",
  },
  {
    path: require("../assets/images/words/man.png"),
    heb: "איש",
    eng: "man",
  },
  {
    path: require("../assets/images/words/chair.jpeg"),
    heb: "כיסא",
    eng: "chair",
  },
  {
    path: require("../assets/images/words/drinking-glass.jpeg"),
    heb: "כוס",
    eng: "glass",
  },
];
export default function Lesson() {
  const [imagesOrder, setImagesOrder] = useState(
    [0, 1, 2, 3].sort(() => Math.random() - 0.5)
  );
  const correctAnswer = Math.floor(Math.random() * 4);
  const checkAnswer = (answer: number) => {
    console.log(
      `you chose ${pictures[answer].eng} and the correctAnswer is ${pictures[correctAnswer].eng}`
    );
    if (answer == correctAnswer) right();
    else wrong();
  };
  const right = () => {
    alert("oh yeah");
  };
  const wrong = () => {
    alert("oh no the answer is " + pictures[correctAnswer].eng);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{}}>בחר את התמונה המתאימה:</Text>
      <Text style={{ fontSize: 30, fontWeight: 700 }}>
        {pictures[correctAnswer].heb}
      </Text>
      <FlatList
        data={imagesOrder}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ alignItems: "center", padding: 10 }}
        renderItem={({ item }) => (
          <Button style={{ margin: 10 }} onPress={() => checkAnswer(item)}>
            <Image
              source={pictures[item].path}
              style={{
                borderColor: "#ccebff",
                borderWidth: 2,
                width: 140,
                height: 140,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontWeight: "400", fontSize: 20 }}>
              {pictures[item].eng.charAt(0).toUpperCase() +
                pictures[item].eng.slice(1)}
            </Text>
          </Button>
        )}
      />
    </View>
  );
}
