import { FC } from "react";

import "./FilmCard.css";
import { Movie } from "../../api/Movie";

export interface FilmCardProps {
  type: "account" | "genre" | "top10";
  filmData: Movie | undefined;
  number?: number;
  deleteFromFavorite?: () => void;
}

export const FilmCard: FC<FilmCardProps> = ({
  type,
  filmData,
  number,
  deleteFromFavorite,
}) => {
  {
    if (filmData) {
      return (
        <div className="film-card__container">
          <img
          loading="lazy"
            className="film-card__image"
            src={
              filmData.posterUrl
                ? filmData.posterUrl
                : "../../src/img/baner-movie.jpg"
            }
            alt="Картинка"
          />

          {type === "top10" && number !== undefined && (
            <span className="film-card__number">{number + 1}</span>
          )}

          {type === "account" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (deleteFromFavorite) {
                  deleteFromFavorite()
                }
              }}
              className="delet-from-favorite__btn"
            >
              <img src="../../src/img/close-icon.png" alt="" />
            </button>
          )}
        </div>
      );
    }
  }

  return undefined;
};
