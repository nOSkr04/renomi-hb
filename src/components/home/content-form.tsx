import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TextField } from "../layout/text-field";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helper/common";
import ErrorText from "../layout/error-text";
import * as ImagePicker from "expo-image-picker";
import { AddContentVideo } from "./add-content-video";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SelectCategorySheet from "../category/select-category-sheet";
import { ICategory } from "../../interfaces/category";
export type IContentForm = {
  name: string;
  video: string;
  category: ICategory;
  description: string;
};

type Props = {
  control: Control<IContentForm, any>;
};

const ContentForm = ({ control }: Props) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [snapIndex, setSnapIndex] = useState(-1);
  const openCategoryModal = () => {
    modalRef.current?.present();
    setSnapIndex(0);
  };

  const closeCategoryModal = () => {
    modalRef.current?.close();
    setSnapIndex(-1);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="video"
        render={({ field: { onChange, value }, formState: { errors } }) => {
          const pickImage = async () => {
            let result: ImagePicker.ImagePickerResult =
              await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                videoQuality: 1,
              });
            if (!result.canceled) {
              onChange(result.assets[0].uri);
            }
          };

          if (value) {
            return <AddContentVideo videoSource={value} />;
          }
          return (
            <>
              <TouchableOpacity
                style={[styles.uploadVideo, errors.video && styles.errorBorder]}
                onPress={pickImage}
              >
                <FontAwesome
                  name="birthday-cake"
                  size={50}
                  color={theme.colors.black}
                />
                <Text style={styles.uploadTitle}>Бичлэг оруулах</Text>
              </TouchableOpacity>
              <ErrorText error={errors.video?.message} />
            </>
          );
        }}
        // rules={{ required: "Заавал оруулна уу" }}
      />
      <View style={styles.h8} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <>
            <TextField
              onChangeText={onChange}
              value={value}
              placeholder="Хэнээс"
              error={errors.name?.message}
            />
            <ErrorText error={errors.name?.message} />
          </>
        )}
        // rules={{
        //   required: "Заавал оруулна уу",
        // }}
      />
      <View style={styles.h8} />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <>
            <TouchableOpacity
              style={[styles.typeContianer, errors.video && styles.errorBorder]}
              onPress={openCategoryModal}
            >
              <Text style={[styles.typeTitle, value && styles.colorBlack]}>
                {value?.name || "Төрөл"}
              </Text>
              <Entypo
                name="chevron-down"
                size={20}
                color={value ? theme.colors.black : theme.colors.neutral(0.5)}
              />
            </TouchableOpacity>
            <ErrorText error={errors.category?.message} />
            <SelectCategorySheet
              modalRef={modalRef}
              closeCategoryModal={closeCategoryModal}
              snapIndex={snapIndex}
              onChange={onChange}
            />
          </>
        )}
        // rules={{
        //   required: "Заавал сонгоно уу",
        // }}
      />
      <View style={styles.h8} />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <TextField
            onChangeText={onChange}
            value={value}
            placeholder="Мэнд хүргэх"
            multiline
          />
        )}
        // rules={{
        //   required: "Заавал оруулна уу",
        //   // minLength: { value: 4, message: "Та 4-с дээш тэмдэгт оруулна уу" },
        // }}
      />
    </View>
  );
};

export default ContentForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
  },
  h8: {
    height: 8,
  },
  uploadVideo: {
    backgroundColor: theme.colors.neutral(0.2),
    borderRadius: 12,
    width: "100%",
    height: hp(45),
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  typeContianer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: theme.colors.neutral(0.2),
  },
  typeTitle: {
    fontSize: 14,
    color: theme.colors.neutral(0.5),
    lineHeight: 30,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  colorBlack: {
    color: theme.colors.black,
  },
});
