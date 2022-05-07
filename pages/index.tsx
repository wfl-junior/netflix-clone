import { Movie, Paginated } from "@/@types/tmdb";
import { MovieSection } from "@/components/MovieSection";
import { axiosInstance } from "@/utils/axiosInstance";
import { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  popular: Paginated<Movie>;
  nowPlaying: Paginated<Movie>;
  topRated: Paginated<Movie>;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [popular, nowPlaying, topRated] = await Promise.all([
    axiosInstance.get<Paginated<Movie>>("/movie/popular"),
    axiosInstance.get<Paginated<Movie>>("/movie/now_playing"),
    axiosInstance.get<Paginated<Movie>>("/movie/top_rated"),
  ]);

  return {
    props: {
      popular: popular.data,
      nowPlaying: nowPlaying.data,
      topRated: topRated.data,
    },
  };
};

const Home: NextPage<HomeProps> = ({ popular, nowPlaying, topRated }) => {
  return (
    <main className="my-8 flex flex-col gap-[3vw]">
      <MovieSection title="Popular" movies={popular.results} />
      <MovieSection title="Now Playing" movies={nowPlaying.results} />
      <MovieSection title="Top Rated" movies={topRated.results} />
    </main>
  );
};

export default Home;
