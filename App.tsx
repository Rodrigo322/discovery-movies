import { StatusBar } from "expo-status-bar";
import { MovieProvider } from "./src/context/MoviesContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes />
        <StatusBar style="light" translucent backgroundColor="#242A32" />
      </MovieProvider>
    </>
  );
}
