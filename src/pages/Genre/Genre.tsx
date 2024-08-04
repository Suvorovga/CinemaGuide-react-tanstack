import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./Genre.css";
import { useQuery } from "@tanstack/react-query";
import { MovieArray, getGenreMovies } from "../../api/Movie";
import { queryClient } from "../../api/QueryClient";
import { FilmCard } from "../../components/FilmCard/FilmCard";

export const Genre = () => {
  const { genre } = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState<MovieArray>([]);

  const btnRef = useRef<HTMLButtonElement>(null);

  const genreMoviesQuery = useQuery(
    {
      queryFn: () => getGenreMovies(genre, pageNumber),
      queryKey: ["genre-movies", pageNumber],
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    if (genreMoviesQuery.data) {
      setMovies((prev) => prev.concat(genreMoviesQuery.data));
    }
    if (genreMoviesQuery.data?.length === 0 || (genreMoviesQuery.data && genreMoviesQuery.data?.length < 50) ) {
      btnRef.current?.classList.add("none");
    }
  }, [genreMoviesQuery.data]);

  if (genre) {
    return (
      <section className="genre__section">
        <div className="container genre__container">
          <div className="genre__main">
            <Link to={"/movie/genres"} className="genre__main-back">
              <svg
                width="12"
                height="21"
                viewBox="0 0 14 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z"
                  fill="white"
                />
              </svg>
            </Link>
            <h2 className="genre__main-text">{`${genre[0].toUpperCase()}${genre.slice(
              1
            )}`}</h2>
          </div>
          <ul className="genre__list">
            {movies.map((it) => (
              <li className="genre__item" key={it.id}>
                <Link
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  to={`/movie/${it.id}`}
                >
                  <FilmCard type="genre" filmData={it} />
                </Link>
              </li>
            ))}
          </ul>
          {genreMoviesQuery.status === "error" && (
            <div
              style={{ color: "white", marginBottom: 64, textAlign: "center" }}
            >
              Что-то пошло не так...
            </div>
          )}
          {genreMoviesQuery.status === "pending" && (
            <div
              style={{ color: "white", marginBottom: 64, textAlign: "center" }}
            >
              Скоро что-то появится...
            </div>
          )}
          <button
            ref={btnRef}
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
            className="genre__btn-more"
          >
            Показать еще
          </button>
        </div>
      </section>
    );
  }
  return <></>
};
