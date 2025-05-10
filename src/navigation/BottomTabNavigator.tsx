import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SceneStyleInterpolators } from '@react-navigation/bottom-tabs';
import { FavoritesSongsScreen } from '@features/music-player/screens/FavoritesSongsScreen';
import { MusicListScreen } from '@features/music-player/screens/MusicListScreen';
import PlaylistIconOutline from '@assets/icons/playlist-outline.svg';
import { IonIcon } from '@shared/components/IonIcon';
import { TransitionSpecs } from '@react-navigation/stack';
import { COLORS } from '@config/theme/Colors';

export type RootStackParams = {

}

const Tab = createBottomTabNavigator();
export function BottomTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      sceneStyleInterpolator: SceneStyleInterpolators.forShift,
      tabBarActiveTintColor: COLORS.DARK.base,
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
      },
      tabBarStyle: {
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        position: 'absolute',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
      }
    }}>
      <Tab.Screen name='Music' component={MusicListScreen}
      options={{
        transitionSpec: TransitionSpecs.RevealFromBottomAndroidSpec,
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="musical-notes-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name='Favorites' component={FavoritesSongsScreen}
      options={{
        transitionSpec: TransitionSpecs.RevealFromBottomAndroidSpec,
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="heart-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name='Playlists' component={MusicListScreen} 
      options={{
        transitionSpec: TransitionSpecs.RevealFromBottomAndroidSpec,
        tabBarIcon: ({ color, size }) => (
          <PlaylistIconOutline width={size} height={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}