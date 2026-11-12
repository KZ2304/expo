import { StyleSheet } from 'react-native';

import { SocialColors } from '@/constants/social-theme';

export const loadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: SocialColors.background,
  },
  message: {
    color: SocialColors.secondaryText,
    fontSize: 14,
  },
});
