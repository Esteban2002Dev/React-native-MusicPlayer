import { View, Text, Pressable, StyleSheet } from 'react-native'
import { COLORS } from '@config/theme/Colors';
import { IonIcon } from './IonIcon';
import React from 'react'

interface ButtonProps {
    label?: string;
    color?: string;
    textColor?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onPress?: () => void;
}

export function MainButton({
    label,
    color = COLORS.PURPLE.base,
    icon,
    iconComponent,
    iconPosition = 'left',
    onPress,
    textColor = COLORS.WHITE.base
}: ButtonProps) {
    const renderIcon = () => {
        if (iconComponent) return iconComponent;
        if (icon) return <IonIcon name={icon} color={textColor} size={22} />;
        return null;
    };

    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.buttonContainer,
            { backgroundColor: color, opacity: pressed ? 0.7 : 1 }
        ]}>
            <View style={[
                styles.contentContainer,
                iconPosition === 'right' && { flexDirection: 'row-reverse' }
            ]}>
                {renderIcon() && <View style={styles.iconWrapper}>{renderIcon()}</View>}
                <Text style={[styles.buttonText, {color: textColor}]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        minHeight: 50,
        minWidth: '50%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        marginHorizontal: 8
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    }
});
