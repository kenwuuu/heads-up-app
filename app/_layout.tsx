import {Tabs, useRootNavigationState} from 'expo-router';
import {IconButton, PaperProvider} from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useEffect} from 'react';
import {NAVY, PURPLE, YELLOW} from "@/src/constants/stylingConstants";

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
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          tabBarStyle: route.name === 'game' ? HIDE_TAB_BAR as any : TAB_BAR as any, // todo fix the "as any" hack
          tabBarActiveTintColor: YELLOW, // Set active tab icon/text color to white
          tabBarInactiveTintColor: PURPLE, // Set inactive tab icon/text color to lightgray
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Heads Up!',
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
            href: null,
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="edit-deck"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

export const HIDE_TAB_BAR = {
  display: 'none'
};
export const TAB_BAR = {
  backgroundColor: NAVY,
  borderTopWidth: 0,
};