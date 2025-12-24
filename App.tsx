import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { RegistrationProvider } from './src/context/RegistrationContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <RegistrationProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </RegistrationProvider>
    </PaperProvider>
  );
}
