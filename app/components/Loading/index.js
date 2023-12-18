import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingIndicator = ({ message }) => {
  return (
    <View style={style.root} accessibilityViewIsModal >
      <ActivityIndicator size="large" color="#ffffff" />
      {!!message && <Text style={style.message}>{message}</Text>}
    </View>
  );
};

export default LoadingIndicator;

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000097",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
    zIndex: 150
  },
  message: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
});


