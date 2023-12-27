import { ActivityIndicator, Dimensions, View, FlatList, Text, ScrollView } from 'react-native';
import { useMovies } from '../hooks/useMovies'
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming ,isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  if (isLoading) {
    return (
      // el size de ActivityIndicator em ios no se ve mas grande, solo en android
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color="red" size={ 100 } />
      </View>
    );
  }

  // en renderItem se pone el elemento que se quiere mostrar
  // el view de height: 400 es para evitar que se vea la sombra
  // ScrollView es para q el contenedor tenga scroll
  return (
    <ScrollView>
      <View style={{ marginTop: top + 20 }}>
        {/* Main carousel */}
        {/* inactiveSlideOpacity es para que se mas transparente los items al costado del principal y no se vea con mucha sombra */}
        <View style={{
          height: 440,
        }}>
          <Carousel
            data={nowPlaying}
            renderItem={ ({ item }) => <MoviePoster movie={item} /> }
            sliderWidth={ windowWidth }
            itemWidth={ 300 }
            inactiveSlideOpacity={0.9}
          />
        </View>

        {/* Popular movies */}
        <HorizontalSlider title='Popular' movies={ popular }/>
        <HorizontalSlider title='Top rated' movies={ topRated }/>
        <HorizontalSlider title='Upcoming' movies={ upcoming }/>
      </View>
    </ScrollView>

  )
}

