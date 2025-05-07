import { Pressable } from 'react-native';
import React from 'react';
import { IonIcon } from '@shared/components/IonIcon';

export function BackButton() {
    return (
        <Pressable style={({pressed}) => ({
            opacity: pressed ? .8 : 1
        })}>
            <IonIcon name='chevron-back' size={29} />
        </Pressable>
    )
}