import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { Appbar } from '@shared/components/Appbar';
import { View, Text } from 'react-native';
import React from 'react';

export function MusicList() {
    return (
        <View style={[globalStyles.container, globalStyles.background]}>
            <Appbar showBackButton />
            <View style={globalStyles.appContainer}>
                <Text>MusicList</Text>
            </View>
        </View>
    )
}
