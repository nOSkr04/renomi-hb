import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useBottomSheet } from "@gorhom/bottom-sheet";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const CustomBackdrop = ({
  animatedIndex,
}: {
  animatedIndex: SharedValue<number>;
}) => {
  const { close } = useBottomSheet();
  const containerAniamtedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });
  return (
    <AnimatedPressable
      onPress={() => close()}
      style={[StyleSheet.absoluteFill, styles.overlay, containerAniamtedStyle]}
    >
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </AnimatedPressable>
  );
};

export default CustomBackdrop;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
