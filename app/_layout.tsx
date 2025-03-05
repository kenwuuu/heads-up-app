import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <IconButton
              icon="home"
              iconColor="#fff"
              onPress={() => router.push('/')}
            />
          ),
        }}
      />
    </PaperProvider>
  );
} 