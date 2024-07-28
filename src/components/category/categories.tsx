import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { ICategory } from "../../interfaces/category";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helper/common";
import CategoryItem from "./category-item";

type Props = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  activeCategory: null | string;
  data: ICategory[];
};

const Categories = ({ setActiveCategory, activeCategory, data }: Props) => {
  const renderItem = ({ item, index }: { item: ICategory; index: number }) => {
    return (
      <CategoryItem
        item={item}
        index={index}
        isActive={activeCategory === item._id}
        setActiveCategory={setActiveCategory}
      />
    );
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatlistContainer: {
    gap: 8,
    marginBottom: 12,
    overflow: "visible",
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
});
