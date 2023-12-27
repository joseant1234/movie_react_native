import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movie';

// se pone el nombre de la ruta, por ejemplo "HomeScreen" y el tipo se pone undefined porque no recibe parametros
// DetailScreen nombre de la ruta, Movie es el tipo de dato que recibe la ruta
export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // cardStyle: {
        //   backgroundColor: 'white',
        // }
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" options={{ cardStyle: { backgroundColor: 'white' } }} component={DetailScreen} />
    </Stack.Navigator>
  );
}