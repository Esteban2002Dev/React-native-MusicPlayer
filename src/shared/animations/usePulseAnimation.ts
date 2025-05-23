import { Animated, StyleProp, ViewStyle } from 'react-native';
import { useEffect, useRef } from 'react';

export function usePulseAnimation(): StyleProp<ViewStyle> {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.05,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, []);

    return {
        transform: [{ scale }],
    };
}
