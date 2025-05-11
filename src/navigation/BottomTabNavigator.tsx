import { FavoritesSongsScreen } from '@features/music-player/screens/FavoritesSongsScreen';
import { MusicListScreen } from '@features/music-player/screens/MusicListScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaylistIconOutline from '@assets/icons/playlist-outline.svg';
import { CustomTabBar } from './components/AnimatedBottomTabBar';
import { IonIcon } from '@shared/components/IonIcon';

const Tab = createBottomTabNavigator();
export function BottomTabNavigator() {
  return (
    <Tab.Navigator
    tabBar={(props) => <CustomTabBar {... props}></CustomTabBar>}
    screenOptions={{
      headerShown: false,
      animation: 'fade'
    }}>
      <Tab.Screen name='Music' component={MusicListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="musical-notes-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name='Favorites' component={FavoritesSongsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="heart-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name='Playlists' component={MusicListScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <PlaylistIconOutline width={size} height={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}