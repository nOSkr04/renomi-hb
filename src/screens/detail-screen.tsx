import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import useSWR from "swr";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../navigation/types";
import { AdviceApi } from "../apis";
import { Video } from "../components/home/video";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../helper/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.DetailScreen
>;
const DetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const paddingTop = top + 10;

  const { data } = useSWR(`swr.content.${id}`, async () => {
    const res = await AdviceApi.advice({ id });
    return res;
  });

  if (!data) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={[{ paddingTop, paddingBottom: 16 }, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={hp(3)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Нэр</Text>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={hp(3)} color="white" />
        </TouchableOpacity>
      </View>
      {/* <Video videoSource={data?.video} /> */}
      <Text style={styles.description}>
        Хайртаа дүүдээ төрсөн өдрийн мэнд хүргэе
      </Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
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
  description: {
    marginHorizontal: wp(4),
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
  },
});
