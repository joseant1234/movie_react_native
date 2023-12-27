import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../navigation/NavigationScreen';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from "react-native-vector-icons/Ionicons";

const screenHeight = Dimensions.get('screen').height;

//<RootStackParams es lo que está en navigationScreen, 'DetailScreen' es lo q está definido en RootStackParams la prop DetailScreen>
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {
}

export const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  // ScrollView para hacer scroll, en ios poder arrastrar la pantalla hacia abajo
  return (
    <ScrollView>
      <View style={ styles.imageContainer }>
        <View style={ styles.imageBorder }>
          <Image
            source={{ uri }}
            style={ styles.posterImage }
          />
        </View>
      </View>

      <View style={ styles.marginContainer }>
        <Text style={ styles.subtitle }>{ movie.original_title }</Text>
        <Text style={ styles.title }>{ movie.title }</Text>
      </View>


      {
        isLoading
          ? <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20 }} />
          : <MovieDetails movieFull={ movieFull! } cast={ cast } />
      }

      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={ () => navigation.pop() }
        >
          <Icon
            color="white"
            name="arrow-back-outline"
            size={ 60 }
          />
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    widht: '100%',
    height: screenHeight * 0.7, //70% de la pantalla
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9, // para android
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999, // para ios
    elevation: 9, // para android
    top: 30,
    left: 5,
  }

});