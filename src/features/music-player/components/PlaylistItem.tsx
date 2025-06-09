import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    Animated,
    Platform,
} from 'react-native';
import { IPlaylist } from '@shared/interfaces/music-player/playlist.interface';
import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { withOpacityHex } from '@features/utils/colorUtils';
import profileImg from '@assets/images/esteban.jpeg';
import { IonIcon } from '@shared/components/IonIcon';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@config/theme/Colors';
import React, { useRef } from 'react';

interface PlaylistItemProps {
    playlist: IPlaylist;
}

export function PlaylistItem({ playlist }: PlaylistItemProps) {
    const { t } = useTranslation();
    const animValue = useRef(new Animated.Value(0)).current;
    let longPressTimeout: any;

    const handlePressIn = () => {
        Animated.timing(animValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();

        longPressTimeout = setTimeout(() => {
            showMenu();
        }, 1000);
    };

    const handlePressOut = () => {
        Animated.timing(animValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        clearTimeout(longPressTimeout);
    };

    const showMenu = () => {
        console.log('Abrir menú...');
    }

    const scale = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.03],
    });

    const animatedStyle = {
        backgroundColor: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.WHITE[200], COLORS.WHITE[300]],
        }),
        borderWidth: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        borderColor: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', withOpacityHex(COLORS.DARK.base, 0.1)],
        }),
        ...Platform.select({
            ios: {
                shadowColor: COLORS.DARK.base,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 0.35],
                }),
                shadowRadius: 3,
            },
            android: {
                elevation: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 3],
                })
            },
        }),
        transform: [{ scale }],
        borderRadius: 10,
        marginHorizontal: 12,
        marginTop: 5
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={animatedStyle}>
                <View style={[styles.container, globalStyles.background]}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={profileImg} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{playlist.name}</Text>
                        <Text style={styles.subtitle}>{t(`playlists-screen.playlist-item.created-at`, { ns: 'musicPlayer' })} 27/06/1998</Text>
                        <Text style={styles.subtitle}>{playlist.songs.length} {playlist.songs.length > 1
                            ? t(`playlists-screen.playlist-item.songs-length.plural`, { ns: 'musicPlayer' })
                            : t(`playlists-screen.playlist-item.songs-length.singular`, { ns: 'musicPlayer' })}</Text>
                    </View>
                    <View>
                        <Pressable style={({pressed}) => ({
                            opacity: pressed ? .7 : 1
                        })}
                        onPress={showMenu}>
                            <IonIcon name="ellipsis-vertical" size={20} color={COLORS.DARK.base} />
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 10,
    },
    imageContainer: {
        aspectRatio: 1,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: COLORS.DARK.base,
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 16
    },
    subtitle: {
        color: COLORS.DARK.base,
        fontSize: 12,
        opacity: 0.7,
        marginTop: 2,
        lineHeight: 14
    },
});
