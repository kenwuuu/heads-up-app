import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: route.name !== 'game',
          headerLeft: route.name !== 'game' && route.name !== 'index' ? () => (
            <IconButton
              icon="home"
              iconColor="#fff"
              onPress={() => router.navigate('/')}
            />
          ) : undefined,
          gestureEnabled: false,
          animation: 'none',
          orientation: route.name === 'game' ? 'landscape' : 'portrait',
          listeners: {
            focus: async () => {
              if (route.name === 'game') {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
              } else {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
              }
            },
          },
        })}
      />
    </PaperProvider>
  );
} 