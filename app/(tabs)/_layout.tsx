import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderHeaderRight = () => (
    <Pressable>
      {({ pressed }) => (
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            width: 35, 
            height: 35,
            marginRight: 15,
            opacity: pressed ? 0.5 : 1,
          }}
        />
      )}
    </Pressable>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].text,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].text,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? 'light'].background
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: renderHeaderRight,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerRight: renderHeaderRight,
        }}
      />
    </Tabs>
  );
}
