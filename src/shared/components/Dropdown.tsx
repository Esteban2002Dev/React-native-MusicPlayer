import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '@config/theme/Colors';
import React, { useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing
} from 'react-native-reanimated';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

interface DropdownProps {
    label: string;
    options: string[];
    onSelect: (option: string) => void;
}
export function AnimatedDropdown({
    label,
    options,
    onSelect
}: DropdownProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const animation = useSharedValue(0);

    const AnimatedIonIcon = Animated.createAnimatedComponent(Ionicons);
    const iconRotation = useSharedValue(0);

    const toggleDropdown = () => {
        setOpen(!open);
        animation.value = withTiming(open ? 0 : 1, {
            duration: 300,
            easing: Easing.out(Easing.exp)
        });
        iconRotation.value = withTiming(open ? 0 : 180, {
            duration: 300
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: animation.value }],
        opacity: animation.value,
        height: animation.value * options.length * 40,
        overflow: 'hidden'
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${iconRotation.value}deg` }]
    }));

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.header} onPress={toggleDropdown}>
                <Text style={styles.label}>{selected || label}</Text>
                <AnimatedIonIcon
                    name="chevron-down"
                    size={20}
                    color={COLORS.DARK.base}
                    style={iconStyle}
                />
            </Pressable>
            <Animated.View style={[styles.dropdown, animatedStyle]}>
                {options.map((option) => (
                    <Pressable
                        key={option}
                        style={styles.option}
                        onPress={() => handleSelect(option)}>
                        <Text style={styles.optionText}>{option}</Text>
                    </Pressable>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.GREY[400],
        backgroundColor: COLORS.WHITE.base,
        height: 50
    },
    label: {
        fontSize: 16,
        color: COLORS.DARK.base
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.GREY[300],
        borderRadius: 8,
        backgroundColor: COLORS.WHITE.base,
        marginTop: 55,
        zIndex: 100,
        transform: [{ scaleY: 0 }],
        opacity: 0
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    optionText: {
        fontSize: 14,
        color: COLORS.DARK.base
    }
});
