import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext';
import LoginScreen from './components/screen/LoginScreen';
import SignupScreen from './components/screen/SignupScreen'; // Make sure to create this component
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './components/screen/HomeScreen';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {token == null ? (
          // Unprotected routes
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // Protected routes
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;