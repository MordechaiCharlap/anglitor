import { Platform, StyleSheet } from "react-native";
import * as appStyle from "./appStyleSheet";
const appComponentsDefaultStyles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: appStyle.color_outline,
    color: appStyle.color_on_surface,
    backgroundColor: appStyle.color_surface,
  },
  round: { borderRadius: 999, paddingHorizontal: 12 },
  outline: { borderWidth: 0.5, borderColor: appStyle.color_outline },
  errorInput: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: appStyle.color_error,
    color: appStyle.color_on_surface,
    backgroundColor: appStyle.color_surface,
  },
  dropDown: {
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: appStyle.color_outline,
    color: appStyle.color_on_surface,
    backgroundColor: appStyle.color_surface,
  },
  errorDropDown: {
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: appStyle.color_error,
    color: appStyle.color_on_surface,
    backgroundColor: appStyle.color_surface,
  },
  inputPlaceHolder: {
    color: appStyle.color_on_surface,
  },
  inputText: {
    color: appStyle.color_on_surface,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textOnInput: {
    color: appStyle.color_on_surface_variant,
  },
  placeholder: {},
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default appComponentsDefaultStyles;
