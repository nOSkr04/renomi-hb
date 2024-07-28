import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "../layout/custom-backdrop";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import useSWR from "swr";
import { CategoryApi } from "../../apis";
import { ICategory } from "../../interfaces/category";
import { wp } from "../../helper/common";
import { theme } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
type Props = {
  modalRef: React.RefObject<BottomSheetModalMethods>;
  snapIndex: number;
  closeCategoryModal: () => void;
  onChange: (...event: any[]) => void;
};

const SelectCategorySheet = ({
  modalRef,
  closeCategoryModal,
  snapIndex,
  onChange,
}: Props) => {
  const snapPoints = useMemo(() => ["25%"], []);
  const { data: category } = useSWR("swr.category", async () => {
    const res = await CategoryApi.categoryList();
    return res;
  });

  const onSelect = useCallback((item: ICategory) => {
    onChange(item);
    closeCategoryModal();
  }, []);

  const renderItem = useCallback(({ item }: { item: ICategory }) => {
    return (
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => onSelect(item)}
      >
        <Text style={styles.title}>{item.name}</Text>
        <AntDesign name="right" color={theme.colors.neutral(1)} size={20} />
      </TouchableOpacity>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.p8} onPress={closeCategoryModal}>
          <AntDesign name="left" color={theme.colors.neutral(1)} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төрөл</Text>
        <TouchableOpacity style={styles.p8}>
          <AntDesign name="right" color={theme.colors.white} size={20} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <BottomSheetModal
      enablePanDownToClose
      ref={modalRef}
      enableDismissOnClose={true}
      enableDynamicSizing={true}
      index={snapIndex}
      snapPoints={snapPoints}
      backdropComponent={CustomBackdrop}
      onDismiss={closeCategoryModal}
    >
      <BottomSheetFlatList
        data={category}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={styles.root}
        ListHeaderComponent={renderHeader}
      />
    </BottomSheetModal>
  );
};

export default SelectCategorySheet;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: wp(4),
  },
  categoryContainer: {
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: theme.colors.neutral(0.2),
  },
  title: {
    fontSize: 12,
    color: theme.colors.neutral(1),
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  p8: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutral(1),
  },
});
