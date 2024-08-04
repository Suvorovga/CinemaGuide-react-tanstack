import { Link } from "react-router-dom";
import { FC } from "react";
import { UseQueryResult, useMutation } from "@tanstack/react-query";

import "./Favorite.css";
import { FilmCard } from "../../../components/FilmCard/FilmCard";
import { Movie, deleteFavorite } from "../../../api/Movie";
import { queryClient } from "../../../api/QueryClient";

export interface FavoriteProps {
  favoriteMovies: string[];
  movieQueries: UseQueryResult<Movie | undefined, Error>[];
}

export const Favorite: FC<FavoriteProps> = ({
  favoriteMovies,
  movieQueries,
}) => {
  const deleteFavoriteMutation = useMutation(
    {
      mutationFn: (id: string) => deleteFavorite(id),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      },
    },
    queryClient
  );

  if (favoriteMovies && movieQueries) {
    return (
      <div className="container account-favorite__container">
        <ul className="account-favorite__list">
          {movieQueries.map((it) => (
            <li key={crypto.randomUUID()} className="account-favorite__item">
              <Link
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="account-favorite__item-link"
                to={`/movie/${it.data?.id}`}
              >
                <FilmCard
                  type="account"
                  filmData={it?.data}
                  deleteFromFavorite={() => {
                    if (it.data && it.data.id) {
                      deleteFavoriteMutation.mutate(it.data.id.toString());
                    }
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null
};
