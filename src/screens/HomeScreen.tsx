import { ActivityIndicator, Text, View } from 'react-native'
import { useMovies } from '../hooks/useMovies'

export const HomeScreen = () => {

  const { moviesAtTheCinema, isLoading } = useMovies();

  if (isLoading) {
    return (
      // el size de ActivityIndicator em ios no se ve mas grande, solo en android
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={ 100 } />
      </View>
    );
  }

  return (
    <View>
        <Text>HomeScreen</Text>
    </View>
  )
}

