import { Text, TextInput, TextInputProps, View } from 'react-native';

import { SocialColors } from '@/constants/social-theme';
import { authFieldStyles as styles } from '@/components/ui/auth.styles';

type AuthFieldProps = TextInputProps & {
  label: string;
};

export function AuthField({ label, ...inputProps }: AuthFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={SocialColors.secondaryText}
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}
