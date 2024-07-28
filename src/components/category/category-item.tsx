import Animated, { FadeInRight } from "react-native-reanimated";
import { theme } from "../../constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";
import { hp } from "../../helper/common";
import { ICategory } from "../../interfaces/category";

type Props = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  item: ICategory;
  index: number;
  isActive: boolean;
};

const CategoryItem = ({ item, index, isActive, setActiveCategory }: Props) => {
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  const backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.category, { backgroundColor }]}
        onPress={() => setActiveCategory(item._id)}
      >
        <Text style={[styles.title, { color }]}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: "500",
  },
});

export default CategoryItem;
