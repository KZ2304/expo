import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createRemotePost } from '@/data/posts';
import { SocialColors } from '@/constants/social-theme';
import { createPostStyles as styles } from '@/components/ui/create-post.styles';

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function CreatePostScreen() {
  const [name, setName] = useState('beaaliper');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleCreatePost() {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const normalizedImageUrl = imageUrl.trim();

    if (!normalizedName || !normalizedImageUrl) {
      setError('Enter a name and image URL.');
      return;
    }

    if (!isHttpUrl(normalizedImageUrl)) {
      setError('Enter a valid image link beginning with http:// or https://.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await createRemotePost({
        name: normalizedName,
        description: normalizedDescription,
        image: normalizedImageUrl,
      });
      router.back();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to create the post. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  const previewUrl = imageUrl.trim();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Text style={styles.description}>
              Add an image link to share a post. Local image uploads aren’t enabled.
            </Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              accessibilityLabel="Name"
              autoCapitalize="none"
              onChangeText={setName}
              placeholder="Your username"
              placeholderTextColor={SocialColors.secondaryText}
              style={styles.input}
              value={name}
            />

            <Text style={styles.label}>Description (optional)</Text>
            <TextInput
              accessibilityLabel="Description"
              multiline
              onChangeText={setDescription}
              placeholder="Write a caption..."
              placeholderTextColor={SocialColors.secondaryText}
              style={[styles.input, styles.descriptionInput]}
              textAlignVertical="top"
              value={description}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
              accessibilityLabel="Image URL"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              onChangeText={setImageUrl}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor={SocialColors.secondaryText}
              style={styles.input}
              value={imageUrl}
            />

            {isHttpUrl(previewUrl) ? (
              <Image
                source={{ uri: previewUrl }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : null}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              accessibilityRole="button"
              disabled={submitting}
              onPress={handleCreatePost}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && !submitting && styles.pressed,
                submitting && styles.disabled,
              ]}>
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Create Post</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
