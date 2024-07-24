import { NativeStackScreenProps } from "@react-navigation/native-stack";
export enum NavigationRoutes {
  Root = "Root",
  HomeScreen = "HomeScreen",
  AuthScreen = "AuthScreen",
  DetailScreen = "DetailScreen",
  AddPostScreen = "AddPostScreen",
}

export type RootStackParamList = {
  HomeScreen: undefined;
  AuthScreen: undefined;
  DetailScreen: { id: string };
  AddPostScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
