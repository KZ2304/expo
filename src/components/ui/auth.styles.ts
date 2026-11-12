import { StyleSheet } from 'react-native';

import { SocialColors } from '@/constants/social-theme';

export const authFieldStyles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    color: SocialColors.secondaryText,
    fontSize: 12,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: SocialColors.border,
    borderRadius: 4,
    backgroundColor: SocialColors.primaryLight,
    paddingHorizontal: 12,
    color: SocialColors.text,
    fontSize: 13,
  },
});

export const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SocialColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: SocialColors.border,
    paddingHorizontal: 28,
    paddingVertical: 34,
  },
  brandRow: {
    alignItems: 'center',
    marginBottom: 26,
  },
  brandName: {
    color: SocialColors.text,
    fontSize: 36,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -1.5,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    color: SocialColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: SocialColors.secondaryText,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  form: {
    gap: 12,
  },
  error: {
    color: SocialColors.error,
    fontSize: 13,
    lineHeight: 19,
    marginTop: -8,
  },
  primaryButton: {
    minHeight: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SocialColors.primary,
    marginTop: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
  demoNote: {
    color: SocialColors.secondaryText,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 24,
  },
  footerText: {
    color: SocialColors.secondaryText,
    fontSize: 14,
  },
  link: {
    color: SocialColors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

export const registerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SocialColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: SocialColors.border,
    paddingHorizontal: 28,
    paddingVertical: 28,
  },
  brandRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    color: SocialColors.text,
    fontSize: 36,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -1.5,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: SocialColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: SocialColors.secondaryText,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  form: {
    gap: 10,
  },
  error: {
    color: SocialColors.error,
    fontSize: 13,
    lineHeight: 19,
    marginTop: -6,
  },
  primaryButton: {
    minHeight: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SocialColors.primary,
    marginTop: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
  demoNote: {
    color: SocialColors.secondaryText,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 18,
  },
  footerText: {
    color: SocialColors.secondaryText,
    fontSize: 14,
  },
  link: {
    color: SocialColors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
