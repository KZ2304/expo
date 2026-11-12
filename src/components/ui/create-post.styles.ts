import { StyleSheet } from 'react-native';

import { SocialColors } from '@/constants/social-theme';

export const createPostStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SocialColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
  },
  description: {
    color: SocialColors.secondaryText,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  label: {
    color: SocialColors.text,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: SocialColors.border,
    borderRadius: 8,
    backgroundColor: SocialColors.surface,
    paddingHorizontal: 13,
    color: SocialColors.text,
    fontSize: 14,
    marginBottom: 16,
  },
  descriptionInput: {
    minHeight: 96,
    paddingTop: 12,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: SocialColors.surface,
    marginBottom: 16,
  },
  error: {
    color: SocialColors.error,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  submitButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: SocialColors.primary,
    marginTop: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.65,
  },
});
