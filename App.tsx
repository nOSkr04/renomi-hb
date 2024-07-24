import { StyleSheet, Text, View } from "react-native";
import useCachedResources from "./src/hooks/use-cached-resources";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useUpdates } from "./src/hooks/use-update";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SWRConfig } from "swr";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "./src/navigation/navigation-container";
export default function App() {
  const appIsReady = useCachedResources();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useUpdates();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig>
          <SafeAreaProvider>
            <View onLayout={onLayoutRootView} style={styles.container}>
              <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                  <NavigationContainer />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </View>
          </SafeAreaProvider>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
