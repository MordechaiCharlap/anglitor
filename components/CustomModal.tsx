import { ReactNode } from "react";
import { Modal, StyleProp, Text, View, ViewStyle } from "react-native";
import CustomButton from "./CustomButton";
type ModalProps = {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  rightOrWrong?: boolean;
};
const CustomModal = ({
  children,
  onPress,
  style,
  rightOrWrong,
}: ModalProps) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={[
            {
              backgroundColor: "#448791",
              padding: 20,
              alignItems: "center",
            },
            style,
          ]}
        >
          <CustomButton
            style={{ backgroundColor: "#7eb85d", paddingHorizontal: 40 }}
          >
            <Text>כל הכבוד! עבור לתרגיל הבא</Text>
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;
