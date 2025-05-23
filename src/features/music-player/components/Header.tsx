import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@config/theme/Colors';
import React from 'react';

interface HeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    rightContent?: React.ReactNode;
}

export function Header({
    title = 'Good Morning',
    subtitle = 'Luis Esteban!',
    description = 'Listen to your music... ',
    rightContent
}: HeaderProps) {
    return (
        <View style={headerStyles.headerContainer}>
            <View style={headerStyles.leftContainer}>
                <Text style={headerStyles.title}>{title}</Text>
                <Text style={headerStyles.subtitle}>{subtitle}</Text>
                <Text style={headerStyles.description}>{description}</Text>
            </View>
            <View style={headerStyles.rightContainer}>
                {rightContent ?? null}
            </View>
        </View>
    )
}

const headerStyles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    rightContainer: {
        paddingHorizontal: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        lineHeight: 40,
        fontWeight: 'bold',
        color: COLORS.PURPLE.base
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'medium',
        lineHeight: 30,
        color: COLORS.PURPLE.base
    },
    description: {
        fontSize: 15,
        color: COLORS.PURPLE.base
    },
});