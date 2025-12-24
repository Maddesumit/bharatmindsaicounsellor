import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Auth/AuthScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';
import OptionListScreen from '../screens/OptionList/OptionListScreen';
import { getCurrentUser } from '../services/authService';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [initialRoute, setInitialRoute] = useState<string>('Auth');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const user = await getCurrentUser();
        if (user) {
            setInitialRoute('Registration');
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return null; // Or a loading screen
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Auth">
                    {({ navigation }) => (
                        <AuthScreen
                            onAuthSuccess={(userId) => {
                                navigation.navigate('Registration' as never);
                            }}
                            onSkip={() => {
                                navigation.navigate('Registration' as never);
                            }}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="OptionList" component={OptionListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
