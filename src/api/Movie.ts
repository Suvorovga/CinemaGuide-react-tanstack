import { z } from "zod";
import { validateResponse } from "./ValidateResponse";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  originalTitle: z.string().nullable(),
  language: z.string().nullable(),
  releaseYear: z.number().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string().nullable()),
  plot: z.string().nullable(),
  runtime: z.number().nullable(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string().nullable(),
  status: z.string().nullable(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYouTubeId: z.string().nullable(),
  tmdbRating: z.number().nullable(),
  searchL: z.string().nullable(),
  keywords: z.array(z.string().nullable()),
  countriesOfOrigin: z.array(z.string().nullable()),
  languages: z.array(z.string().nullable()),
  cast: z.array(z.string().nullable()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export const GenresSchema = z.array(z.string());

export const MovieArraySchema = z.array(MovieSchema);

export type Movie = z.infer<typeof MovieSchema>;
export type MovieArray = z.infer<typeof MovieArraySchema>;
export type Genres = z.infer<typeof GenresSchema>;

export function getRandomMovie(): Promise<Movie> {
  return fetch("https://cinemaguide.skillbox.cc/movie/random", {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data));
}

export function addFavorite(id: string): Promise<void> {
  return fetch("https://cinemaguide.skillbox.cc/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: new URLSearchParams({ id }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function deleteFavorite(id: string): Promise<void> {
  return fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function getTop10Movie(): Promise<MovieArray> {
  return fetch("https://cinemaguide.skillbox.cc/movie/top10", {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieArraySchema.parse(data));
}

export function getMovieId(id: string | undefined): Promise<Movie> | undefined {
  if (id) {
    return fetch(`https://cinemaguide.skillbox.cc/movie/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then(validateResponse)
      .then((response) => response.json())
      .then((data) => MovieSchema.parse(data));
  }
  return undefined;
}

export function getGenres(): Promise<Genres> {
  return fetch("https://cinemaguide.skillbox.cc/movie/genres", {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => GenresSchema.parse(data));
}

export function getGenreMovies(
  genre: string | undefined,
  page: number
): Promise<MovieArray> {
  return fetch(
    `https://cinemaguide.skillbox.cc/movie?genre=${genre}&page=${page}`,
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieArraySchema.parse(data));
}

export function getMoviesTimeout(
  seacrhFilmTimeout: number,
  title: string
): Promise<MovieArray> | [] {
  if (seacrhFilmTimeout !== 0 && title !== '') {
    return fetch(`https://cinemaguide.skillbox.cc/movie?title=${title}`, {
      method: "GET",
      credentials: "include",
    })
      .then(validateResponse)
      .then((response) => response.json())
      .then((data) => MovieArraySchema.parse(data));
  }
  return []
}
