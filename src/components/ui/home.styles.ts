import { StyleSheet } from 'react-native';

import { SocialColors } from '@/constants/social-theme';

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SocialColors.background,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 28,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 600,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: SocialColors.border,
  },
  wordmark: {
    color: SocialColors.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -1.3,
    fontStyle: 'italic',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  addPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: SocialColors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  addPostLabel: {
    color: SocialColors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  feedError: {
    color: SocialColors.error,
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  postCard: {
    backgroundColor: SocialColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: SocialColors.border,
    paddingBottom: 12,
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postOptions: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SocialColors.primaryLight,
  },
  postAuthor: {
    flex: 1,
    marginLeft: 9,
  },
  authorName: {
    color: SocialColors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  postMeta: {
    color: SocialColors.secondaryText,
    fontSize: 11,
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: SocialColors.primaryLight,
  },
  postImagePressable: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    color: SocialColors.text,
    fontSize: 25,
    lineHeight: 30,
  },
  heartLiked: {
    color: SocialColors.accent,
  },
  heart: {
    fontSize: 29,
    lineHeight: 30,
  },
  likes: {
    color: SocialColors.text,
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 12,
    marginTop: 4,
  },
  caption: {
    color: SocialColors.text,
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  captionUsername: {
    fontWeight: '700',
  },
  endOfFeed: {
    color: SocialColors.secondaryText,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
  },
  imageViewer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageViewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  imageViewerUsername: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  fullImage: {
    flex: 1,
    width: '100%',
  },
  imageViewerCaption: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  deleteBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  deleteCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    backgroundColor: SocialColors.surface,
    padding: 22,
  },
  deleteTitle: {
    color: SocialColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  deleteDescription: {
    color: SocialColors.secondaryText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  deleteError: {
    color: SocialColors.error,
    fontSize: 13,
    marginTop: 12,
  },
  deleteActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  deleteCancelButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: SocialColors.background,
  },
  deleteCancelText: {
    color: SocialColors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  deleteConfirmButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: SocialColors.error,
  },
  deleteConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.55,
  },
});
