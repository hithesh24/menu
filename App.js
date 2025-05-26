import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
console.log('✅ LearnScreen component:', LearnScreen);
import CropTutorialsScreen from './screens/CropTutorialsScreen';
import AITipsScreen from './screens/AITipsScreen';
import WeatherScreen from './screens/WeatherScreen';
import DIYToolsScreen from './screens/DIYToolsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({ tabBarIcon: ({ color, size }) => {let iconName;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Learn') iconName = 'book';
            else if (route.name === 'CropTutorials') iconName = 'leaf';
            else if (route.name === 'AITips') iconName = 'bulb';
            else if (route.name === 'Weather') iconName = 'sunny';
            else if (route.name === 'DIYTools') iconName = 'hammer';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
       
<Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen 
          name="CropTutorials" 
          component={CropTutorialsScreen} 
          options={{ tabBarButton: () => null }} 
        />
        <Tab.Screen 
          name="AITips" 
          component={AITipsScreen} 
          options={{ tabBarButton: () => null }} 
        />
        <Tab.Screen 
          name="Weather" 
          component={WeatherScreen} 
          options={{ tabBarButton: () => null }} 
        />
        <Tab.Screen 
          name="DIYTools" 
          component={DIYToolsScreen} 
          options={{ tabBarButton: () => null }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
