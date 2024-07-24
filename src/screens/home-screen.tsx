import {
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { MasonryFlashList, MasonryFlashListRef } from "@shopify/flash-list";
import { getColumnCount, hp, wp } from "../helper/common";
import { AdviceApi, UserApi } from "../apis";
import { authLogout } from "../store/auth-slice";
import { theme } from "../constants/theme";
import ImageCard from "../components/home/image-card";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../navigation/types";
const HomeScreen = () => {
  const scrollRef = useRef<MasonryFlashListRef<any>>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { mutate } = useSWRConfig();
  const paddingTop = top + 10;
  const columns = getColumnCount();
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index, previousPageData) => {
      if (
        previousPageData &&
        previousPageData.rows &&
        previousPageData.rows.length === 0
      ) {
        return null;
      }

      return `swr.content.${index + 1}`;
    },
    async (key) => {
      const page = key.split(".").pop();
      const res = await AdviceApi.advices({
        page: parseInt(`${page || 0}`, 10),
        limit: 10,
      });
      return res;
    }
  );

  const handleScrollUp = () => {
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onLogout = useCallback(async () => {
    try {
      await UserApi.logout();
      dispatch(authLogout());
      mutate("swr.user.me", null, false);
    } catch (err: any) {
      console.log(err);
    }
  }, [dispatch, mutate]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return <ImageCard item={item} index={index} />;
    },
    []
  );

  const onAdd = useCallback(() => {
    navigation.navigate(NavigationRoutes.AddPostScreen);
  }, []);
  LogBox.ignoreLogs([
    "You have passed a style to FlashList. This list doesn't support styling, use contentContainerStyle or wrap the list in a parent and apply style to it instead.",
  ]);
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>💖Номи💖</Text>
        </Pressable>
        <View style={styles.row}>
          <Pressable onPress={onLogout}>
            <SimpleLineIcons name="logout" size={hp(3)} />
          </Pressable>
          <Pressable onPress={onAdd}>
            <SimpleLineIcons name="plus" size={hp(3)} />
          </Pressable>
        </View>
      </View>
      <MasonryFlashList
        data={(data || []).map((entry) => entry?.data).flat()}
        renderItem={renderItem}
        estimatedItemSize={200}
        scrollEventThrottle={5}
        ref={scrollRef}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyle}
        style={styles.cardContainer}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: hp(4),
    fontWeight: "600",
    color: theme.colors.neutral(0.9),
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    gap: 15,
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
  cardContainer: {
    minHeight: 3,
    width: wp(100),
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
