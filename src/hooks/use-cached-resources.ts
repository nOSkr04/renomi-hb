import * as Font from "expo-font";
import { useEffect, useState } from "react";
export default function useCachedResources() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Mono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return appIsReady;
}
