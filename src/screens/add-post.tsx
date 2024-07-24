import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../helper/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const AddPostScreen = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const paddingTop = top + 10;
  return (
    <View>
      <View style={[{ paddingTop, paddingBottom: 16 }, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={hp(3)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мэнд хүргэх</Text>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={hp(3)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
