import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import image from '../../../../temp/images/song_image.jpeg';
import { IonIcon } from '@shared/components/IonIcon';
import { COLORS } from '@config/theme/Colors';
import React from 'react';

export function MusicPlayerBanner() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={{
                    width: '100%',
                    height: '100%'
                }} source={image} />
            </View>
            <View style={styles.informationContainer}>
                <Text style={{
                    color: COLORS.WHITE.base,
                    fontWeight: '600'
                }}>Tocame</Text>
                <Text style={{
                    color: COLORS.WHITE.base,
                    fontWeight: '300'
                }}>Santa grifa</Text>
            </View>
            <View style={styles.iconContainer}>
                <Pressable style={({pressed}) => ({
                    opacity: pressed ? .7 : 1
                })}>
                    <IonIcon color={COLORS.WHITE.base} name='play' />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 75,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.DARK_BLUE.base,
        marginHorizontal: 10,
        padding: 10,
        minHeight: 60,
        borderRadius: 10,
        zIndex: 1
    },
    imageContainer: {
        aspectRatio: 1,
        height: '100%',
        borderRadius: 5,
        marginRight: 10,
        overflow: 'hidden'
    },
    informationContainer: {
        flex: 6
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});