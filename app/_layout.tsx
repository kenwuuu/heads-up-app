import {Tabs, useRootNavigationState} from 'expo-router';
import {IconButton, PaperProvider} from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useEffect} from 'react';

export default function RootLayout() {
  const routeState = useRootNavigationState();

  useEffect(() => {
    const changeOrientation = async () => {
      if (routeState?.routes?.length) {
        const currentRoute = routeState.routes[routeState.index]?.name;

        if (currentRoute === 'game') {
          // Lock orientation to landscape left for the game screen
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } else {
          // Lock orientation back to portrait for other screens
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      }
    };

    changeOrientation();
  }, [routeState]);

  return (
    <PaperProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: route.name !== 'game', // Hide header on game screen
          gestureEnabled: false,
          animation: 'none',
          tabBarStyle: route.name === 'game' ? {display: 'none'} : undefined, // Hide tab bar on game screen
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({color, size}) => (
              <IconButton icon="home" size={size} iconColor={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="decks"
          options={{
            title: 'Decks',
            tabBarIcon: ({color, size}) => (
              <IconButton icon="cards" size={size} iconColor={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({color, size}) => (
              <IconButton icon="cog" size={size} iconColor={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="game"
          options={{
            href: null, // This prevents the tab from showing in the tab bar
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            href: null, // This prevents the tab from showing in the tab bar
          }}
        />
        <Tabs.Screen
          name="edit-deck"
          options={{
            href: null, // This prevents the tab from showing in the tab bar
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}