import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import { theme } from "../../constants/theme";
import { wp } from "../../helper/common";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  item: any;
  index: number;
};

const ImageCard = ({ item, index }: Props) => {
  const navigation = useNavigation();
  const style = () => {
    return {
      marginLeft: index % 2 !== 0 ? 5 : 0,
      marginRight: index % 2 !== 0 ? 0 : 5,
    };
  };
  return (
    <Pressable
      style={[styles.imageWrapper, style()]}
      onPress={() =>
        navigation.navigate(NavigationRoutes.DetailScreen, { id: item._id })
      }
    >
      <AnimatedImage
        style={[styles.image]}
        source={item?.image?.url}
        transition={100}
        sharedTransitionTag="WP"
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});