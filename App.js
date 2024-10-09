import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext';
import LoginScreen from './components/screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// New protected screen
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to the Home Screen!</Text>
  </View>
);

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
      <Stack.Navigator>
        {token == null ? (
          // Unprotected route
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Protected route
          <Stack.Screen name="Home" component={HomeScreen} />
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