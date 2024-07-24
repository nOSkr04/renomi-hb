import * as Updates from "expo-updates";
import { useEffect } from "react";

const useUpdates = () => {
  const { isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);
};

export { useUpdates };
