import { FavoritesSongsScreen } from '@features/music-player/screens/FavoritesSongsScreen';
import { MusicListScreen } from '@features/music-player/screens/MusicListScreen';
import { PlaylistScreen } from '@features/music-player/screens/PlaylistScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaylistIconOutline from '@assets/icons/playlist-outline.svg';
import { CustomTabBar } from './components/AnimatedBottomTabBar';
import { IonIcon } from '@shared/components/IonIcon';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
export function BottomTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
    tabBar={(props) => <CustomTabBar {... props}></CustomTabBar>}
    screenOptions={{
      headerShown: false,
      animation: 'fade'
    }}>
      <Tab.Screen name={t('tabs-name.music', { ns: 'tabs' })} component={MusicListScreen}
      options={{
        title: 'Mi musica',
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="musical-notes-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name={t('tabs-name.favorites', { ns: 'tabs' })} component={FavoritesSongsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="heart-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name={t('tabs-name.playlists', { ns: 'tabs' })} component={PlaylistScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <PlaylistIconOutline width={size} height={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}