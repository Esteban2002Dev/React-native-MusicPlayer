import Icon from 'react-native-vector-icons/Ionicons';
import {
    Animated,
    StyleProp,
    ViewStyle,
    StyleSheet,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { usePulseAnimation } from '@shared/animations/usePulseAnimation';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    animateFill?: boolean;
    duration?: number;
    pulseAnimation?: boolean;
}

export function IonIcon({
    name,
    size = 24,
    color = 'black',
    style,
    animateFill = false,
    duration = 1500,
    pulseAnimation = false
}: IconProps) {
    const pulseStyle = pulseAnimation ? usePulseAnimation() : {};

    const progressAnim = useRef(new Animated.Value(0)).current;

    const fillWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    useEffect(() => {   
        if (animateFill) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(progressAnim, {
                        toValue: 1,
                        duration,
                        useNativeDriver: false,
                    }),
                    Animated.timing(progressAnim, {
                        toValue: 0,
                        duration,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        }
    }, []);

    return (
        <Animated.View style={[styles.iconContainer, { width: size, height: size }, style, pulseStyle]}>
            <Icon name={name} size={size} color={color} style={StyleSheet.absoluteFillObject} />
            {animateFill && (
                <Animated.View style={[styles.fillMask, { width: fillWidth }]}>
                    <Icon name={name.replace('-outline', '')} size={size} color={color} />
                </Animated.View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fillMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        height: '100%',
    },
});
