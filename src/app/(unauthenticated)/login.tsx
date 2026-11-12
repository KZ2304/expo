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
import { loginStyles as styles } from '@/components/ui/auth.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || !password) {
      setError('Enter a valid email address and password to continue.');
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
              <Text style={styles.title}>Log in</Text>
              <Text style={styles.subtitle}>See what your friends are sharing.</Text>
            </View>

            <View style={styles.form}>
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                autoComplete="current-password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Pressable
                accessibilityRole="button"
                onPress={handleLogin}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>Login</Text>
              </Pressable>
            </View>

            <Text style={styles.demoNote}>
              Demo experience · account sign-in is not connected yet.
            </Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to Instagram?</Text>
              <Pressable accessibilityRole="link" onPress={() => router.push('/register')}>
                <Text style={styles.link}>Create an account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
