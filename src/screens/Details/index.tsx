import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  Clock,
  DotsThreeVertical,
  Star,
} from "phosphor-react-native";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MovieContext } from "../../context/MoviesContext";

import api from "../../services/api";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type RouterProps = {
  movieId: number;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { addFavoriteMovie, removeFavoriteMovie, favoriteMovies } =
    useContext(MovieContext);

  const route = useRoute();
  const { movieId } = route.params as RouterProps;
  const { goBack } = useNavigation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  }

  if (!movieDetails) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity
          onPress={() => {
            favoriteMovies.includes(movieId)
              ? removeFavoriteMovie(movieDetails.id)
              : addFavoriteMovie(movieDetails.id);
          }}
        >
          <BookmarkSimple
            color="#fff"
            size={32}
            weight={favoriteMovies.includes(movieId) ? "fill" : "light"}
          />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={50} color="#0296E5" />}
      {!loading && (
        <ScrollView>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
            }}
            style={styles.detailsImage}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
            }}
            style={styles.detailsPosterImage}
          />
          <Text style={styles.stars}>{movieDetails.title}</Text>

          <View style={styles.description}>
            <View style={styles.descriptionGroup}>
              <CalendarBlank color="#92929D" size={25} weight="thin" />
              <Text style={styles.descriptionText}>
                {getYear(movieDetails.release_date)}
              </Text>
            </View>
            <DotsThreeVertical color="#92929D" size={32} weight="duotone" />
            <View style={styles.descriptionGroup}>
              <Clock color="#92929D" size={25} weight="thin" />
              <Text style={styles.descriptionText}>
                {movieDetails.runtime} Minutos
              </Text>
            </View>
            <DotsThreeVertical color="#92929D" size={32} weight="duotone" />
            <View style={styles.descriptionGroup}>
              <Star
                color={
                  movieDetails.vote_average.toFixed(2) >= "7"
                    ? "#FF8700"
                    : "#92929D"
                }
                size={25}
                weight={
                  movieDetails.vote_average.toFixed(2) >= "7"
                    ? "duotone"
                    : "thin"
                }
              />
              <Text
                style={[
                  movieDetails.vote_average.toFixed(2) >= "7"
                    ? styles.descriptionText1
                    : styles.descriptionText,
                ]}
              >
                {movieDetails.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.about}>
            <Text style={styles.aboutText}>
              {movieDetails.overview === ""
                ? "Ops! Parece que esse filme ainda não tem sinopse :-("
                : movieDetails.overview}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  detailsImage: {
    position: "absolute",
    width: "100%",
    height: 210,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },
  stars: {
    position: "absolute",
    height: 50,
    left: 140,
    right: 32,
    top: 240,
    color: "#fff",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "700",
  },

  description: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
  },

  descriptionText: {
    marginLeft: 10,
    color: "#92929D",
  },

  descriptionText1: {
    marginLeft: 10,
    color: "#FF8700",
  },

  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  aboutMovie: {
    width: "100%",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  aboutMovieText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  about: {
    padding: 20,
  },
  aboutText: {
    color: "#fff",
    textAlign: "justify",
  },
});
