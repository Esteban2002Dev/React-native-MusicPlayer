import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator';
import { COLORS } from '@config/theme/Colors';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={COLORS.PURPLE.base} barStyle="light-content" />
      <BottomTabNavigator />
    </NavigationContainer>
  )
}