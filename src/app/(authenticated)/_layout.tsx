import { Stack } from 'expo-router';

export default function AuthenticatedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#121316' },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="posts/create"
        options={{
          headerShown: true,
          title: 'Create Post',
          presentation: 'modal',
          headerStyle: { backgroundColor: '#121316' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF' },
        }}
      />
    </Stack>
  );
}
