import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AVATAR, POSTS } from '@/data/images';
import { deleteRemotePost, fetchRemotePosts, type RemotePost } from '@/data/posts';
import { SocialColors } from '@/constants/social-theme';
import { homeStyles as styles } from '@/components/ui/home.styles';
import { LoadingScreen } from '@/components/ui/loading-screen';

type FeedPost = {
  id: string;
  username: string;
  time: string;
  avatar: ImageSourcePropType;
  image: ImageSourcePropType;
  caption: string;
  likes: number;
  remotePost?: RemotePost;
};

const samplePosts: FeedPost[] = [
  {
    id: '1',
    username: 'beaaliper',
    time: '2 hours ago',
    avatar: AVATAR,
    image: POSTS[0],
    caption: '',
    likes: 0,
  },
  {
    id: '2',
    username: 'beaaliper',
    time: '5 hours ago',
    avatar: AVATAR,
    image: POSTS[1],
    caption: '',
    likes: 0,
  },
  {
    id: '3',
    username: 'beaaliper',
    time: 'Yesterday',
    avatar: AVATAR,
    image: POSTS[2],
    caption: '',
    likes: 0,
  },
  ...POSTS.slice(3).map((image, index) => ({
    id: `local-${index + 4}`,
    username: 'beaaliper',
    time: ['2 days ago', '3 days ago', '4 days ago', '5 days ago', '6 days ago', '1 week ago'][
      index
    ] ?? 'Earlier',
    avatar: AVATAR,
    image,
    caption: '',
    likes: 0,
  })),
];

function toFeedPost(post: RemotePost): FeedPost {
  return {
    id: `remote-${post.id}`,
    username: post.name,
    time: 'Recently',
    avatar: AVATAR,
    image: { uri: post.image },
    caption: post.description,
    likes: 0,
    remotePost: post,
  };
}

function PostCard({
  post,
  liked,
  onLike,
  onViewImage,
  onDelete,
}: {
  post: FeedPost;
  liked: boolean;
  onLike: () => void;
  onViewImage: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={styles.postAuthor}>
          <Text style={styles.authorName}>{post.username}</Text>
          <Text style={styles.postMeta}>{post.time}</Text>
        </View>
        {post.remotePost ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${post.username}'s post`}
            hitSlop={8}
            onPress={onDelete}
            style={styles.postOptions}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#FFFFFF" />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${post.username}'s photo`}
        onPress={onViewImage}
        style={styles.postImagePressable}>
        <Image source={post.image} style={styles.postImage} resizeMode="cover" />
      </Pressable>

      <View style={styles.postActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Unlike post' : 'Like post'}
          accessibilityState={{ selected: liked }}
          onPress={onLike}
          style={styles.actionButton}>
          <Text style={[styles.actionIcon, styles.heart, liked && styles.heartLiked]}>
            {liked ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.likes}>{post.likes + (liked ? 1 : 0)} likes</Text>
      {post.caption ? (
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [remotePosts, setRemotePosts] = useState<RemotePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState('');
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<RemotePost | null>(null);
  const [deletingPost, setDeletingPost] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;
      setLoading(true);
      setFeedError('');

      fetchRemotePosts()
        .then((loadedPosts) => {
          if (isFocused) {
            setRemotePosts(loadedPosts);
          }
        })
        .catch((error: unknown) => {
          if (isFocused) {
            setRemotePosts([]);
            setFeedError(error instanceof Error ? error.message : 'Unable to load posts.');
          }
        })
        .finally(() => {
          if (isFocused) {
            setLoading(false);
          }
        });

      return () => {
        isFocused = false;
      };
    }, [])
  );

  const posts = [...remotePosts.map(toFeedPost), ...samplePosts];

  function toggleLike(id: string) {
    setLikedPosts((current) =>
      current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id]
    );
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

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <LoadingScreen message="Loading your feed..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.topBar}>
            <Text style={styles.wordmark}>Instagram</Text>
            <View style={styles.headerActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Create post"
                onPress={() => router.push('/posts/create')}
                style={styles.addPostButton}>
                <Ionicons name="add" size={20} color={SocialColors.text} />
                <Text style={styles.addPostLabel}>Post</Text>
              </Pressable>
            </View>
          </View>

          {feedError ? <Text style={styles.feedError}>{feedError}</Text> : null}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              liked={likedPosts.includes(post.id)}
              onLike={() => toggleLike(post.id)}
              onViewImage={() => setSelectedPost(post)}
              onDelete={() => {
                if (post.remotePost) {
                  setDeleteError('');
                  setPostToDelete(post.remotePost);
                }
              }}
            />
          ))}
          <Text style={styles.endOfFeed}>You’re all caught up.</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setSelectedPost(null)}
        visible={selectedPost !== null}>
        <SafeAreaView style={styles.imageViewer}>
          <View style={styles.imageViewerHeader}>
            <Text style={styles.imageViewerUsername}>{selectedPost?.username}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close photo"
              onPress={() => setSelectedPost(null)}>
              <Ionicons name="close" size={30} color="#FFFFFF" />
            </Pressable>
          </View>
          {selectedPost ? (
            <Image source={selectedPost.image} style={styles.fullImage} resizeMode="contain" />
          ) : null}
          <Text style={styles.imageViewerCaption}>{selectedPost?.caption}</Text>
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

