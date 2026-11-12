import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AVATAR } from '@/data/images';

const colors = {
  background: '#121316',
  active: '#FFFFFF',
  inactive: '#8E9399',
  border: '#3A3D42',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={27}
              color={focused ? colors.active : colors.inactive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={AVATAR}
              style={[
                {
                  width: 27,
                  height: 27,
                  borderRadius: 14,
                },
                focused && {
                  borderColor: colors.active,
                  borderWidth: 2,
                },
              ]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
