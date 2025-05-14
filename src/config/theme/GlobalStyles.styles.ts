import { StyleSheet } from 'react-native';
import { COLORS } from '@config/theme/Colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        backgroundColor: COLORS.WHITE[200]
    },
    appContainer: {
        marginLeft: 12,
        marginRight: 12,
        marginTop: 5,
        marginBottom: 5,
    }
});