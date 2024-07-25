import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

type Props = {
  size?: number;
};

const Loader = ({ size = 24 }: Props) => {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: size,
        height: size,
        alignSelf: "center",
      }}
      source={require("../../assets/lottie/clover.json")}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
