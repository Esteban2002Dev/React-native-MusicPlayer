import { BackButton } from '@shared/components/BackButton';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '@config/theme/Colors';
import React from 'react';

interface AppbarProps {
    title?: string;
    showBackButton?: boolean;
    showBorderBottom?: boolean;
}

export function Appbar({
    title = '',
    showBackButton = false,
    showBorderBottom = false,
}: AppbarProps) {
    return (
        <View style={{
            ... styles.appbarContainer,
            borderBottomWidth: showBorderBottom ? 1 : 0
            }}>
            <View style={styles.leftContainer}>
                {showBackButton ? <BackButton /> : null}
            </View>

            <View style={styles.centerContainer}>
                {title ? <Text style={styles.title}>{title}</Text> : null}
            </View>

            <View style={styles.rightContainer}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appbarContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.GRAY.base,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    centerContainer: {
        flex: 2,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
