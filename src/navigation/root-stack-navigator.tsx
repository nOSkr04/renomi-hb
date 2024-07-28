import React from "react";
import { NavigationRoutes, RootStackParamList } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home-screen";
import AuthScreen from "../screens/auth";
import DetailScreen from "../screens/detail-screen";
import AddPostScreen from "../screens/add-post";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";
import { UserApi } from "../apis";
import { authLogout, authMe } from "../store/auth-slice";
const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

const RootStackNavigator = () => {
  const navigationOptions = () => {
    return { headerShown: false };
  };

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: { auth: IAuth }) => state.auth);
  const { data: user, error } = useSWR<IUser>(
    ["swr.user.me", accessToken],
    async () => {
      return await UserApi.authMe();
    },
    {
      onSuccess: (authData) => {
        dispatch(authMe(authData));
      },
      onError: (err) => {
        if (err.error.code === 401) {
          dispatch(authLogout());
        }
      },
    }
  );

  console.log(user, accessToken, "WEAP");

  console.log(error);

  return (
    <Navigator
      initialRouteName={NavigationRoutes.HomeScreen}
      screenOptions={navigationOptions}
    >
      {user ? (
        <>
          <Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
          <Screen
            component={DetailScreen}
            name={NavigationRoutes.DetailScreen}
          />
          <Screen
            component={AddPostScreen}
            name={NavigationRoutes.AddPostScreen}
          />
        </>
      ) : (
        <Screen component={AuthScreen} name={NavigationRoutes.AuthScreen} />
      )}
    </Navigator>
  );
};

export { RootStackNavigator };
