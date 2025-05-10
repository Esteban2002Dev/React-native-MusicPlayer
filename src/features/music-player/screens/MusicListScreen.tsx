import { Header } from '@features/music-player/components/Header';
import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { Appbar } from '@shared/components/Appbar';
import { COLORS } from '@config/theme/Colors';
import { Image, View } from 'react-native';
import React from 'react';

/**
 * * To import images as modules we have to create the declarations file (declarations.d.ts)
 * * and declare the file type as module.
 */
import profileImg from '@assets/images/esteban.jpeg';

export function MusicListScreen() {
    return (
        <View style={[globalStyles.container, globalStyles.background]}>
            <Appbar showBackButton />
            <View style={globalStyles.appContainer}>
                <Header
                title='Good Morning'
                subtitle='Luis Esteban!'
                description='Listen to your music.'
                rightContent={
                    // TODO: Make this a shared component (ex. <Avatar />)
                    <View>
                        <Image source={profileImg} style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: COLORS.PURPLE.base
                            }} />
                    </View>
                } />
            </View>
        </View>
    )
}
