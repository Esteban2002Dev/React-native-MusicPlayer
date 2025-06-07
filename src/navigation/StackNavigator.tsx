import { AppSettingsScreen } from '@features/settings/screens/AppSettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';

export type RootStackParams = {
    Settings: undefined;
    MusicPlayerTabs: undefined;
}
const Stack = createNativeStackNavigator();
export function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            animation: 'default',
            headerShown: false
        }}>
            <Stack.Screen name="MusicPlayerTabs" options={{ title: '' }} component={BottomTabNavigator} />
            <Stack.Screen name="Settings" options={{ title: 'Settings' }} component={AppSettingsScreen} />
        </Stack.Navigator>
    );
}