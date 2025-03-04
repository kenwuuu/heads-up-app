import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen, GameScreen, ResultsScreen, CustomDeckScreen } from './src/screens';

// Define the type for our navigation stack parameters
export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { score: number };
  CustomDeck: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Heads Up!' }}
            />
            <Stack.Screen 
              name="Game" 
              component={GameScreen}
              options={{ title: 'Play' }}
            />
            <Stack.Screen 
              name="Results" 
              component={ResultsScreen}
              options={{ title: 'Round Results' }}
            />
            <Stack.Screen 
              name="CustomDeck" 
              component={CustomDeckScreen}
              options={{ title: 'Manage Decks' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 