import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { type ComponentProps, type ReactNode, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AVATAR, POSTS } from '@/data/images';
import { deleteRemotePost, fetchRemotePosts, type RemotePost } from '@/data/posts';
import { SocialColors } from '@/constants/social-theme';
import { profileStyles as styles } from '@/components/ui/profile.styles';

type ProfilePost = {
  id: string;
  image: ImageSourcePropType;
  views: number;
  pinned?: boolean;
  remotePost?: RemotePost;
};

const PROFILE = {
  username: 'beaaliper',
  name: 'cocoa',
  note: 'Unpopular opinion...',
  role: 'Artist',
  posts: 9,
  followers: 165,
  following: 183,
  views30d: 648,
  music: { title: 'Space Cadet', artist: 'beabadoobee' },
  obsession: 'bea',
};

const tiles: { views: number; pinned?: boolean }[] = [
  { views: 676, pinned: true },
  { views: 2062, pinned: true },
  { views: 561, pinned: true },
  { views: 256},
  { views: 512},
  { views: 128},
  { views: 1383},
  { views: 456},
  { views: 3211},
];

const profileTabs = [
  'grid-outline',
  'play-circle-outline',
  'repeat-outline',
  'person-circle-outline',
] as const;

export default function ProfileScreen() {
  const [name, setName] = useState(PROFILE.name);
  const [bio, setBio] = useState(PROFILE.note);
  const [draftName, setDraftName] = useState(name);
  const [draftBio, setDraftBio] = useState(bio);
  const [editing, setEditing] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageSourcePropType | null>(null);
  const [postToDelete, setPostToDelete] = useState<RemotePost | null>(null);
  const [deletingPost, setDeletingPost] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [remotePosts, setRemotePosts] = useState<RemotePost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;
      setPostsLoading(true);
      setPostsError('');

      fetchRemotePosts()
        .then((loadedPosts) => {
          if (isFocused) {
            setRemotePosts(loadedPosts);
          }
        })
        .catch((error: unknown) => {
          if (isFocused) {
            setRemotePosts([]);
            setPostsError(error instanceof Error ? error.message : 'Unable to load posts.');
          }
        })
        .finally(() => {
          if (isFocused) {
            setPostsLoading(false);
          }
        });

      return () => {
        isFocused = false;
      };
    }, [])
  );

  function openEditor() {
    setDraftName(name);
    setDraftBio(bio);
    setProfileError('');
    setEditing(true);
  }

  function saveProfile() {
    if (!draftName.trim()) {
      setProfileError('Your display name cannot be empty.');
      return;
    }

    setName(draftName.trim());
    setBio(draftBio.trim());
    setEditing(false);
  }

  async function handleDeletePost() {
    if (!postToDelete || deletingPost) {
      return;
    }

    setDeletingPost(true);
    setDeleteError('');
    try {
      await deleteRemotePost(postToDelete.id);
      setRemotePosts((current) => current.filter((post) => post.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (error: unknown) {
      setDeleteError(error instanceof Error ? error.message : 'Unable to delete post.');
    } finally {
      setDeletingPost(false);
    }
  }

  const localProfilePosts: ProfilePost[] = POSTS.map((image, index) => ({
    id: `local-${index}`,
    image,
    ...tiles[index],
  }));
  const profilePosts: ProfilePost[] = [
    ...localProfilePosts.filter((post) => post.pinned),
    ...remotePosts.map((post) => ({
      id: `remote-${post.id}`,
      image: { uri: post.image },
      views: 0,
      pinned: false,
      remotePost: post,
    })),
    ...localProfilePosts.filter((post) => !post.pinned),
  ];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create post"
          onPress={() => router.push('/posts/create')}>
          <Ionicons name="add" size={32} color={SocialColors.text} />
        </Pressable>
        <View>
          <Text style={styles.topUserText}>{PROFILE.username}</Text>
        </View>
        <View style={styles.menuContainer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Account menu"
            accessibilityState={{ expanded: accountMenuOpen }}
            hitSlop={8}
            onPress={() => setAccountMenuOpen((isOpen) => !isOpen)}>
            <Ionicons name="menu" size={30} color={SocialColors.text} />
          </Pressable>
          {accountMenuOpen ? (
            <View style={styles.accountDropdown}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Log out"
                onPress={() => {
                  setAccountMenuOpen(false);
                  router.replace('/login');
                }}
                style={({ pressed }) => [
                  styles.accountMenuItem,
                  pressed && styles.pressed,
                ]}>
                <Ionicons name="log-out-outline" size={19} color={SocialColors.error} />
                <Text style={styles.accountMenuText}>Log out</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarColumn}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit profile note"
                onPress={openEditor}
                style={({ pressed }) => [styles.noteBubble, pressed && styles.pressed]}>
                <Text numberOfLines={2} style={styles.noteText}>
                  {bio}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View profile picture"
                onPress={() => setPreviewImage(AVATAR)}>
                <Image source={AVATAR} style={styles.avatar} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Create post from profile"
                onPress={() => router.push('/posts/create')}
                style={styles.avatarAdd}>
                <Ionicons name="add" size={16} color={SocialColors.text} />
              </Pressable>
            </View>

            <View style={styles.profileSummary}>
              <View style={styles.nameLine}>
                <Text style={styles.name}>{name}</Text>
                <Ionicons name="checkmark-circle" size={19} color="#3D9BFF" />
              </View>
              <View style={styles.stats}>
                <Stat value={PROFILE.posts + remotePosts.length} label="posts" />
                <Stat value={PROFILE.followers} label="followers" />
                <Stat value={PROFILE.following} label="following" />
              </View>
            </View>
          </View>

          <Text style={styles.role}>{PROFILE.role}</Text>

          <View style={styles.chips}>
            <View style={styles.chip}>
              <Ionicons name="play-outline" size={18} color={SocialColors.text} />
              <Text style={styles.chipText}>
                <Text style={styles.bold}>{PROFILE.music.title}</Text>
                {'  '}
                {PROFILE.music.artist}
              </Text>
            </View>
            <View style={styles.chip}>
              <Ionicons name="heart-outline" size={18} color={SocialColors.text} />
              <Text style={styles.chipText}>
                <Text style={styles.bold}>Current obsession:</Text>
                {'  '}
                {PROFILE.obsession}
              </Text>
            </View>
          </View>

          <View style={styles.dashboard}>
            <Text style={styles.dashboardTitle}>Your dashboard</Text>
            <View style={styles.dashboardSummary}>
              <Ionicons name="trending-up" size={16} color="#3DDC84" />
              <Text style={styles.dashboardText}>
                {PROFILE.views30d} views in the last 30 days.
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={openEditor}
            style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </Pressable>

          <View style={styles.profileTabs}>
            {profileTabs.map((tab, index) => (
              <Pressable
                key={tab}
                accessibilityRole="button"
                accessibilityLabel={`Profile posts tab ${index + 1}`}
                onPress={() => setSelectedTab(index)}
                style={[styles.profileTab, selectedTab === index && styles.profileTabSelected]}>
                <Ionicons
                  name={tab}
                  size={25}
                  color={selectedTab === index ? SocialColors.text : SocialColors.secondaryText}
                />
              </Pressable>
            ))}
          </View>

          {selectedTab === 0 ? (
            <>
              {postsError ? <Text style={styles.postsError}>{postsError}</Text> : null}
              {postsLoading ? (
                <ActivityIndicator color={SocialColors.primary} style={styles.postsLoader} />
              ) : null}
              <View style={styles.grid}>
                {profilePosts.map((post) => (
                  <View key={post.id} style={styles.tile}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`View ${PROFILE.username}'s post photo`}
                      onPress={() => setPreviewImage(post.image)}
                      style={({ pressed }) => [
                        styles.tileImageButton,
                        pressed && styles.tilePressed,
                      ]}>
                      <Image
                        source={post.image}
                        style={styles.tileImage}
                        resizeMode="cover"
                      />
                    </Pressable>
                    {post.pinned ? (
                      <Ionicons
                        name="pin"
                        size={17}
                        color="#FFFFFF"
                        style={styles.tileMark}
                      />
                    ) : null}
                    <View style={styles.views}>
                      <Ionicons name="eye" size={15} color="#FFFFFF" />
                      <Text style={styles.viewsText}>{post.views.toLocaleString()}</Text>
                    </View>
                    {post.remotePost ? (
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Delete ${PROFILE.username}'s post`}
                        onPress={() => {
                          setDeleteError('');
                          setPostToDelete(post.remotePost ?? null);
                        }}
                        style={styles.postOptions}>
                        <Ionicons name="ellipsis-horizontal" size={19} color="#FFFFFF" />
                      </Pressable>
                    ) : null}
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.empty}>
              <Ionicons name={profileTabs[selectedTab]} size={44} color="#555A60" />
              <Text style={styles.emptyText}>Nothing here yet</Text>
            </View>
          )}

          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Personal details</Text>
            <Detail icon="musical-notes-outline" label="Music">
              {PROFILE.music.title} · {PROFILE.music.artist}
            </Detail>
            <Detail icon="heart-outline" label="Current obsession">
              {PROFILE.obsession}
            </Detail>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        onRequestClose={() => setEditing(false)}
        transparent
        visible={editing}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeading}>
              <View>
                <Text style={styles.modalTitle}>Edit profile</Text>
                <Text style={styles.modalSubtitle}>Update your profile details.</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close profile editor"
                onPress={() => setEditing(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>
            <Text style={styles.inputLabel}>Display name</Text>
            <TextInput
              accessibilityLabel="Display name"
              onChangeText={(value) => {
                setDraftName(value);
                setProfileError('');
              }}
              style={styles.input}
              value={draftName}
            />
            <Text style={styles.inputLabel}>Profile note</Text>
            <TextInput
              accessibilityLabel="Profile note"
              multiline
              onChangeText={setDraftBio}
              style={[styles.input, styles.bioInput]}
              textAlignVertical="top"
              value={draftBio}
            />
            {profileError ? <Text style={styles.profileError}>{profileError}</Text> : null}
            <Pressable
              accessibilityRole="button"
              onPress={saveProfile}
              style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={() => setPreviewImage(null)}
        visible={previewImage !== null}>
        <SafeAreaView style={styles.imagePreview}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close image preview"
            onPress={() => setPreviewImage(null)}
            style={styles.imagePreviewClose}>
            <Ionicons name="close" size={30} color="#FFFFFF" />
          </Pressable>
          {previewImage !== null ? (
            <Image source={previewImage} style={styles.fullImage} resizeMode="contain" />
          ) : null}
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={() => {
          if (!deletingPost) {
            setPostToDelete(null);
            setDeleteError('');
          }
        }}
        transparent
        visible={postToDelete !== null}>
        <View style={styles.deleteBackdrop}>
          <View style={styles.deleteCard}>
            <Text style={styles.deleteTitle}>Delete this post?</Text>
            <Text style={styles.deleteDescription}>
              This will permanently remove it from your posts.
            </Text>
            {deleteError ? <Text style={styles.deleteError}>{deleteError}</Text> : null}
            <View style={styles.deleteActions}>
              <Pressable
                accessibilityRole="button"
                disabled={deletingPost}
                onPress={() => {
                  setPostToDelete(null);
                  setDeleteError('');
                }}
                style={({ pressed }) => [
                  styles.deleteCancelButton,
                  pressed && !deletingPost && styles.pressed,
                  deletingPost && styles.disabled,
                ]}>
                <Text style={styles.deleteCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={deletingPost}
                onPress={handleDeletePost}
                style={({ pressed }) => [
                  styles.deleteConfirmButton,
                  pressed && !deletingPost && styles.pressed,
                  deletingPost && styles.disabled,
                ]}>
                {deletingPost ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.deleteConfirmText}>Delete</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={19} color={SocialColors.secondaryText} />
      <View style={styles.detailCopy}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{children}</Text>
      </View>
    </View>
  );
}
