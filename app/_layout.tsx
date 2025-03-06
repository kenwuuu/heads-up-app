import {Tabs} from 'expo-router';
import {IconButton, PaperProvider} from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function RootLayout() {
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
          headerShown: route.name !== 'game',  // Hide header on game screen
          gestureEnabled: false,
          animation: 'none',
          orientation: route.name === 'game' ? 'landscape' : 'portrait',  // lock orientation to landscape on game screen
          tabBarStyle: route.name === 'game' ? {display: 'none'} : undefined,  // Hide tab bar on game screen
          listeners: {
            focus: async () => {
              if (route.name === 'game') {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
              } else {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
              }
            },
          },
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
      </Tabs>
    </PaperProvider>
  );
} 