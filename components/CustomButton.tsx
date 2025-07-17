import appComponentsDefaultStyles from "@/utils/style";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  round?: boolean;
  circle?: boolean;
};

const CustomButton = ({
  children,
  style,
  round,
  circle,
  onPress,
}: ButtonProps) => {
  const getFinalStyle = () => {
    var finalStyle = {};
    finalStyle = { ...finalStyle, ...appComponentsDefaultStyles.button };
    if (style) finalStyle = { ...finalStyle, ...StyleSheet.flatten(style) };
    if (circle)
      finalStyle = {
        ...finalStyle,
        ...appComponentsDefaultStyles.round,
        aspectRatio: 1,
      };
    else if (round)
      finalStyle = { ...finalStyle, ...appComponentsDefaultStyles.round };
    return finalStyle;
  };

  return (
    <TouchableOpacity style={getFinalStyle()} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
export default CustomButton;
