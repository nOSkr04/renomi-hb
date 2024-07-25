import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../helper/common";
import { theme } from "../constants/theme";
import ContentForm, { IContentForm } from "../components/home/content-form";
import { useForm } from "react-hook-form";
import Loader from "../components/layout/loader";

const AddPostScreen = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const paddingTop = top + 10;
  const { handleSubmit, control, setError } = useForm<IContentForm>();
  const onSubmit = async () => {
    setLoading(true);
  };
  return (
    <View style={styles.root}>
      <View style={[{ paddingTop, paddingBottom: 16 }, styles.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <AntDesign name="arrowleft" size={hp(3)} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мэнд хүргэх</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? (
            <Loader size={hp(3)} />
          ) : (
            <Entypo name="check" size={hp(3)} color={theme.colors.black} />
          )}
        </TouchableOpacity>
      </View>
      <ContentForm control={control} />
      <TouchableOpacity style={styles.submit}>
        <Text style={styles.buttontTitle}>Илгээх</Text>
      </TouchableOpacity>
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
  root: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  button: {
    padding: 8,
  },
  submit: {
    marginHorizontal: 20,
    borderColor: "blue",
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginTop: 24,
  },
  buttontTitle: {
    fontSize: hp(2.5),
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center",
    color: theme.colors.white,
  },
});
