import { Text, View } from "react-native";
import { Movie } from "../interfaces/movie";
import { FlatList } from "react-native-gesture-handler";
import { MoviePoster } from "./MoviePoster";

interface Props {
    title?: string;
    movies: Movie[];
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  {/* Se usa style como contenedor para poder manejar facilmente el padding y otros elelemtos */}

  return (
    <View style={{
      height: (title) ? 260 : 220
    }}>
      {
        title && <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>{ title }</Text>
      }

      {/* showsHorizontalScrollIndicator en false es para que no muestre el scroll horizontal del flatList  */}
      <FlatList
        data={movies}
        renderItem={ ({ item }) => (
          <MoviePoster movie={item} width={140} height={130} />
        )}
        keyExtractor={ (item) => item.id.toString() }
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
      />
    </View>
  )
}


