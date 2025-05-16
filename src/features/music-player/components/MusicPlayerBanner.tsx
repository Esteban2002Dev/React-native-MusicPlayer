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

import { View, Text, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { withOpacityHex } from '@features/utils/colorUtils';
import image from '../../../../temp/images/song_image.jpeg';
import { BlurView } from '@react-native-community/blur';
import { IonIcon } from '@shared/components/IonIcon';
import React, { useEffect, useRef } from 'react';
import { useSong } from '../store/song-store';
import { COLORS } from '@config/theme/Colors';

export function MusicPlayerBanner() {
    const { playingSong, changePlayingSongState } = useSong();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (playingSong) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [playingSong]);

    if (!playingSong) return null;

    return (
        <Animated.View style={[styles.wrapper]}>
            <BlurView
                style={styles.absolute}
                blurAmount={2}
                blurType="light"
                reducedTransparencyFallbackColor="white"
            />
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image} />
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.title}>{playingSong.title.length > 30
                    ? playingSong.title.slice(0, 30) + '...' : playingSong.title}</Text>
                    <Text style={styles.artist}>{playingSong.artist.length > 30
                    ? playingSong.artist.slice(0, 30) + '...' : playingSong.artist}</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <IconButton icon="play-back-circle" />
                    <Pressable
                    onPress={() => changePlayingSongState(playingSong)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                        <IonIcon
                            size={24}
                            color={COLORS.WHITE.base}
                            name={playingSong.playing ? 'pause-circle' : 'play-circle'}
                        />
                    </Pressable>
                    <IconButton icon="play-forward-circle" />
                </View>
            </Animated.View>
        </Animated.View>
    );
}

interface IconButtonProps {
    icon: string;
}
function IconButton({ icon }: IconButtonProps) {
    return (
        <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <IonIcon size={24} color={COLORS.WHITE.base} name={icon} />
        </Pressable>
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
        backgroundColor: withOpacityHex(COLORS.DARK_BLUE.base, 0.5),
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
        fontSize: 12,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 5
    },
});
