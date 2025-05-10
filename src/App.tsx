import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="#1D1D1D" barStyle="light-content" />
      <BottomTabNavigator />
    </NavigationContainer>
  )
}