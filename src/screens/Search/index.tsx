import { useNavigation } from "@react-navigation/native";
import {
  CalendarBlank,
  CaretLeft,
  Clock,
  MagnifyingGlass,
  Star,
  WarningCircle,
} from "phosphor-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../services/api";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
}

export function Search() {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState("");

  const { navigate, goBack } = useNavigation();

  const searchMovies = async (query: string) => {
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });
    setSearchResults(response.data.results);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Buscar filmes</Text>
        <WarningCircle color="#fff" size={32} weight="thin" />
      </View>
      <View style={styles.content}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Buscar"
            placeholderTextColor="#fff"
            onChangeText={handleSearch}
            value={searchText}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>
      </View>

      <ScrollView style={styles.contentMyList}>
        {searchResults.map((movie) => (
          <TouchableOpacity
            style={styles.card}
            key={movie.id}
            onPress={() => navigate("Details", { movieId: movie.id })}
          >
            <Image
              style={styles.cardImage}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoTitle}>{movie.title}</Text>
              <View style={styles.cardInfoInfoMovie}>
                <View style={styles.cardInfoInfoMovieContent}>
                  <Star color="#FF8700" size={25} weight="duotone" />
                  <Text style={[styles.cardInfoInfoMovieContentText]}>
                    {movie.vote_average}
                  </Text>
                </View>
                <View style={styles.cardInfoInfoMovieContent}>
                  <CalendarBlank color="#FFF" size={25} weight="thin" />
                  <Text style={styles.cardInfoInfoMovieContentText}>
                    {movie.release_date.substring(0, 4)}
                  </Text>
                </View>
                <View style={styles.cardInfoInfoMovieContent}>
                  <Clock color="#FFF" size={25} weight="thin" />
                  <Text style={styles.cardInfoInfoMovieContentText}>
                    {movie.runtime} Minutos
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  containerInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3A3F47",
    height: 42,
    padding: 10,
    borderRadius: 16,
  },
  input: {
    color: "#fff",
    width: "80%",
  },

  content: {
    padding: 20,
  },
  contentMyList: {
    width: "100%",
    padding: 20,
  },
  card: {
    width: 250,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 16,
  },
  cardInfo: {
    width: 150,
    gap: 10,
  },
  cardInfoTitle: {
    color: "#Fff",
    lineHeight: 24,
    fontSize: 16,
  },
  cardInfoInfoMovie: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  cardInfoInfoMovieContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardInfoInfoMovieContentText: {
    color: "#FFF",
  },
  cardInfoInfoMovieContentText2: {
    color: "#FF8700",
    fontWeight: "700",
  },
});
