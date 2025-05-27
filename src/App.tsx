import 'react-native-gesture-handler';
import { MusicPlayerBanner } from '@features/music-player/components/MusicPlayerBanner';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { StackNavigator } from '@navigation/StackNavigator';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@config/theme/Colors';
import { StatusBar } from 'react-native';

export default function App() {
  const { t } = useTranslation();
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const bottomTabRoutes = [
    t('tabs-name.music', { ns: 'tabs' }),
    t('tabs-name.favorites', { ns: 'tabs' }),
    t('tabs-name.playlists', { ns: 'tabs' }),
  ];
  const handleStateChange = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    const routeName = currentRoute?.name ?? '';

    if (bottomTabRoutes.includes(routeName)) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <StatusBar animated={true} backgroundColor={COLORS.PURPLE.base} barStyle="light-content" />
      {showBanner && <MusicPlayerBanner />}
      <StackNavigator />
    </NavigationContainer>
  );
}