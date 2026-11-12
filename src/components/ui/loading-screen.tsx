import { ActivityIndicator, Text, View } from 'react-native';

import { SocialColors } from '@/constants/social-theme';
import { loadingScreenStyles as styles } from '@/components/ui/loading-screen.styles';

type LoadingScreenProps = {
  message: string;
};

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator accessibilityLabel={message} color={SocialColors.primary} size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
