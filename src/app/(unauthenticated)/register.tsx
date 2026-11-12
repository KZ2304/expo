import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthField } from '@/components/auth-field';
import { registerStyles as styles } from '@/components/ui/auth.styles';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister() {
    if (!name.trim()) {
      setError('Add your name to create your profile.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Choose a password with at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }

    setError('');
    router.replace('/home');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.brandRow}>
              <Text style={styles.brandName}>Instagram</Text>
            </View>

            <View style={styles.heading}>
              <Text style={styles.title}>Create an account</Text>
              <Text style={styles.subtitle}>Join and share your everyday moments.</Text>
            </View>

            <View style={styles.form}>
              <AuthField
                label="Name"
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                autoComplete="name"
                textContentType="name"
                returnKeyType="next"
              />
              <AuthField
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                returnKeyType="next"
              />
              <AuthField
                label="Password"
                placeholder="At least 6 characters"
                value={password}
                onChangeText={setPassword}
                autoComplete="new-password"
                secureTextEntry
                returnKeyType="next"
              />
              <AuthField
                label="Confirm password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoComplete="new-password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Pressable
                accessibilityRole="button"
                onPress={handleRegister}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>Register</Text>
              </Pressable>
            </View>

            <Text style={styles.demoNote}>
              Demo experience · account creation is not connected yet.
            </Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already part of Instagram?</Text>
              <Pressable accessibilityRole="link" onPress={() => router.push('/login')}>
                <Text style={styles.link}>Log in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
