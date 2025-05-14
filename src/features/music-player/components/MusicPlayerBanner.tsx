/**
 * BlurView Component
 * 
 * Version: 
 * 4.4.1
 * 
 * Package:
 * @react-native-community/blur
 * 
 * Installation:
 * npm install @react-native-community/blur
 * 
 * Usage:
 * Import the BlurView and place it as an overlay on top of the element you want to blur.
 * Documentation:
 * https://www.npmjs.com/package/@react-native-community/blur
 */

import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { withOpacityHex } from '@features/utils/colorUtils';
import image from '../../../../temp/images/song_image.jpeg';
import { BlurView } from '@react-native-community/blur';
import { IonIcon } from '@shared/components/IonIcon';
import { COLORS } from '@config/theme/Colors';
import React from 'react';

interface MusicPlayerBannerProps {
    
}
export function MusicPlayerBanner() {
    return (
        <View style={styles.wrapper}>
            <BlurView
            style={styles.absolute}
            blurAmount={2}
            blurType="light"
            reducedTransparencyFallbackColor="white" />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image} />
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.title}>Me acostumbre a lo bueno</Text>
                    <Text style={styles.artist}>Fuerza regida</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                        <IonIcon color={COLORS.WHITE.base} name='play' />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    wrapper: {
        position: 'absolute',
        bottom: 75,
        left: 10,
        right: 10,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 1,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: withOpacityHex(COLORS.DARK_BLUE.base, .5),
        opacity: 50,
        padding: 5,
        minHeight: 60,
        alignItems: 'center',
    },
    imageContainer: {
        aspectRatio: 1,
        height: '100%',
        borderRadius: 5,
        marginRight: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    informationContainer: {
        flex: 6,
    },
    title: {
        color: COLORS.WHITE.base,
        fontWeight: '600',
    },
    artist: {
        color: COLORS.WHITE.base,
        fontWeight: '300',
        fontSize: 12
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
