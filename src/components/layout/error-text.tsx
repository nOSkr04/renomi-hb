import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ErrorText = ({ error }: { error?: string }) => {
  if (!error) {
    return <View style={styles.h8} />;
  }
  return <Text style={styles.error}>{error}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    textAlign: "right",
    color: "red",
    marginTop: 4,
  },
  h8: {
    height: 12,
  },
});
