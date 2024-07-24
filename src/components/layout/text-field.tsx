import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import React, { memo, useState } from "react";
import { theme } from "../../constants/theme";

type Props = TextInputProps & {
  error?: string;
  icon?: React.ReactNode;
};

const TextField = memo(({ error, icon, ...rest }: Props) => {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <TextInput
        {...rest}
        style={focused ? styles.focusInput : styles.input}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
    </View>
  );
});

TextField.displayName = "TextField";

export { TextField };

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: theme.colors.neutral(0.2),
  },
  focusInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: theme.colors.primary,
  },
});
