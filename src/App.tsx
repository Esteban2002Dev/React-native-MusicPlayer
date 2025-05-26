import 'react-native-gesture-handler';
import { MusicPlayerBanner } from '@features/music-player/components/MusicPlayerBanner';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from '@config/theme/Colors';
import { StatusBar } from 'react-native';
import { StackNavigator } from '@navigation/StackNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={COLORS.PURPLE.base} barStyle="light-content" />
      {/* <MusicPlayerBanner /> */}
      <StackNavigator />
    </NavigationContainer>
  )
}