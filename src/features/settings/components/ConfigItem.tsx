import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { withOpacityHex } from '@features/utils/colorUtils';
import { IonIcon } from '@shared/components/IonIcon';
import profileImg from '@assets/images/esteban.jpeg';
import { COLORS } from '@config/theme/Colors';
import React, { useRef } from 'react';

export interface ConfigItemProps {
    sectionTitle?: string;
    itemTitle: string;
    itemSubtitle?: string;
    itemHelpText?: string;
    actionText?: string;
    startIconName?: string;

    onPress?: () => void;
}

export function ConfigItem({
    sectionTitle,
    itemTitle,
    itemSubtitle,
    itemHelpText,
    actionText,
    startIconName,
    onPress,
}: ConfigItemProps) {
    const onPressAnimation = useRef(new Animated.Value(0)).current;

    const onPressIn = () => {
        Animated.timing(onPressAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(onPressAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = onPressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.WHITE[200], COLORS.GREY[200]],
    });

    const borderWidth = onPressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const borderColor = onPressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', COLORS.GREY[300]],
    });

    return (
        <View style={styles.container}>
            {sectionTitle && <Text style={styles.title}>{sectionTitle}</Text>}
            <Pressable
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={{ borderRadius: 12 }}>
                <Animated.View
                    style={[
                        styles.item,
                        {
                            backgroundColor,
                            borderWidth,
                            borderColor,
                        },
                    ]}
                >
                    <View style={styles.startContainer}>
                        {startIconName ? (
                            <IonIcon name={startIconName} color={COLORS.DARK.base} size={25} />
                        ) : (
                            <Image source={profileImg} style={styles.image} />
                        )}
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>{itemTitle}</Text>
                        {itemSubtitle && <Text style={styles.itemSubtitle}>{itemSubtitle}</Text>}
                        {itemHelpText && <Text style={styles.itemHelpText}>{itemHelpText}</Text>}
                    </View>

                    {(actionText || true) && (
                        <View style={styles.actionContainer}>
                            {actionText && <Text style={styles.actionText}>{actionText}</Text>}
                            <IonIcon
                                name="chevron-forward"
                                size={24}
                                color={withOpacityHex(COLORS.DARK.base, 70)}
                            />
                        </View>
                    )}
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.DARK.base,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 5
    },
    startContainer: {
        width: 50,
        height: 50,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.PURPLE.base
    },
    textContainer: {
        flex: 1
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.DARK.base
    },
    itemSubtitle: {
        fontSize: 14,
        color: COLORS.GREY[800]
    },
    itemHelpText: {
        fontSize: 12,
        color: COLORS.GREY[600]
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionText: {
        fontSize: 12,
        color: COLORS.GREY[800],
        marginRight: 4
    }
});
