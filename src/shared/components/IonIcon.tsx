import Icon from 'react-native-vector-icons/Ionicons';
import { TextStyle, ViewStyle } from 'react-native';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
}
export function IonIcon({
    name,
    size = 20,
    color,
    style
}: IconProps) {
    return (
        <Icon style={style} name={name} size={size} color={color} />
    )
}