import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Animated,
    PanResponder,
    useWindowDimensions,
    PanResponderGestureState,
    GestureResponderEvent,
} from 'react-native';
import PlaylistIconOutline from '@assets/icons/playlist-outline.svg';
import { ISong } from '@shared/interfaces/song.interface';
import { IonIcon } from '@shared/components/IonIcon';
import { useSong } from '../store/song-store';
import { COLORS } from '@config/theme/Colors';
import { useRef } from 'react';

interface MusicItemProps {
    item: ISong;
    index: number;
    disabled?: boolean;
}

export function MusicItem({
    item,
    index,
}: MusicItemProps) {
    const { width } = useWindowDimensions();
    const { playSong } = useSong();
    const formatIndex = () => {
        return index.toString().length === 1 ? '0' + index.toString() : index;
    };

    const translateX = useRef(new Animated.Value(0)).current;

    const borderRadius = translateX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 10],
        extrapolate: 'clamp',
    });

    const addToQueue = (side: string) => {
        console.log(side);
    };
    const reproduceSong = (song: ISong) => {
        playSong(song);
    }
    
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const { pageX } = evt.nativeEvent;
                return pageX < 200 && gestureState.dx > 0;
            },
            onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const dx = Math.min(width * 0.3, Math.max(0, gestureState.dx));
                translateX.setValue(dx);
            },
            onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                addToQueue('left');
                Animated.spring(translateX, {
                    toValue: 0,
                    bounciness: 12,
                    speed: 4,
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    return (
        <View>
            {/* hidden button */}
            <View style={styles.hiddenButtonContainer}>
                <View style={styles.hiddenButton}>
                    <PlaylistIconOutline width={25} height={25} color={COLORS.WHITE.base} />
                </View>
            </View>
            <Animated.View
            style={[
                {
                    transform: [{ translateX }],
                    overflow: 'hidden',
                    borderRadius,
                },
            ]}
            {...panResponder.panHandlers}>
                <Pressable style={({pressed}) => ({
                    ... styles.container,
                    backgroundColor: pressed ? COLORS.GREY.base : COLORS.WHITE[200]
                })}
                onPress={() => reproduceSong(item)}>
                    <View style={styles.index}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.indexText}>
                            {formatIndex()}
                        </Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.artist}>{item.artist}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                            <IonIcon name="ellipsis-vertical" size={20} color={COLORS.DARK.base} />
                        </Pressable>
                    </View>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        flexDirection: 'row',
        gap: 5,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: COLORS.GREY.base,
    },
    hiddenButtonContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
        backgroundColor: COLORS.DARK_BLUE.base,
        zIndex: -1,
        width: '70%'
    },
    hiddenButton: {
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    index: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3
    },
    textBlock: {
        flex: 9,
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 12,
        color: 'grey',
    },
    icon: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});