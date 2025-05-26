import { useAppNavigation } from '@navigation/hooks/useAppNavigation';
import { IonIcon } from '@shared/components/IonIcon';
import { Pressable } from 'react-native';
import React from 'react';

export function BackButton() {
    const { navigation } = useAppNavigation();

    return (
        <Pressable style={({pressed}) => ({
            opacity: pressed ? .8 : 1
        })} onPress={() => navigation.canGoBack() ? navigation.goBack() : null}>
            <IonIcon name='chevron-back' size={29} />
        </Pressable>
    )
}