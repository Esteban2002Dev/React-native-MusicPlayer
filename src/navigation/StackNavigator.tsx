import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MusicList } from '../features/music-playes/screens/MusicList';

export type RootStackParams = {

}

const Stack = createStackNavigator();
export function StackNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
            <Stack.Screen options={{title: ''}} name='MusicList' component={MusicList} />
        </Stack.Navigator>
    );
}