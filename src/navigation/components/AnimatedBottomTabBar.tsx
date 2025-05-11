import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '@config/theme/Colors';
import { useEffect } from 'react';

export function CustomTabBar(props: BottomTabBarProps) {
    const tabsWidth = props.state.routes.map(() => useSharedValue(0));
    const scales = props.state.routes.map(() => useSharedValue(1));

    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <View
                style={{
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: 10,
                    borderTopEndRadius: 25,
                    borderTopStartRadius: 25,
                    borderTopWidth: 1.5,
                    borderRightWidth: 1.5,
                    borderLeftWidth: 1.5,
                    borderColor: COLORS.GREY.base,
                    backgroundColor: COLORS.WHITE.base
                }}>
                    {props.state.routes.map((route, index) => (
                        <TabButton
                            key={index}
                            route={route}
                            index={index}
                            isFocused={props.state.index === index}
                            navigation={props.navigation}
                            descriptors={props.descriptors}
                            tabWidth={tabsWidth[index]}
                            scale={scales[index]}
                        />
                    ))}
            </View>
        </View>
    );
}

type TabButtonProps = {
    route: BottomTabBarProps['state']['routes'][0];
    index: number;
    isFocused: boolean;
    navigation: BottomTabBarProps['navigation'];
    descriptors: BottomTabBarProps['descriptors'];
    tabWidth: SharedValue<number>;
    scale: SharedValue <number>;
};

function TabButton({ route, isFocused, navigation, descriptors, tabWidth, scale }: TabButtonProps) {
    const { options } = descriptors[route.key];

    const icon =
        options.tabBarIcon &&
        options.tabBarIcon({
            color: isFocused ? COLORS.DARK.base : 'grey',
            size: 24,
            focused: isFocused,
        });

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedLineStyle = useAnimatedStyle(() => ({
        width: tabWidth.value,
    }));

    useEffect(() => {
        if (isFocused) {
            tabWidth.value = withTiming(30, { duration: 200 });
        } else {
            tabWidth.value = withTiming(0, { duration: 200 });
        }
    }, [isFocused]);

    const handlePress = () => {
        if (!isFocused) {
            scale.value = withTiming(1.2, { duration: 200 }, () => {
                scale.value = withTiming(1, { duration: 200 });
            });
            navigation.navigate(route.name);
        }
    };

    return (
        <TouchableOpacity
        onPress={handlePress}
        style={{ flexDirection: 'column', alignItems: 'center', width: '33%' }}
        activeOpacity={0.7}>
            <Animated.View style={animatedIconStyle} pointerEvents='none'>
                {icon}
            </Animated.View>
            <Text style={{ color: isFocused ? COLORS.DARK.base : 'grey' }}>{route.name}</Text>
            <Animated.View
                style={[
                    {
                        height: 2,
                        backgroundColor: COLORS.DARK.base,
                        marginTop: 4,
                    },
                    animatedLineStyle,
                ]}
            />
        </TouchableOpacity>
    );
}
